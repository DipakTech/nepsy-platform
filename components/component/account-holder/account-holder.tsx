"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Pencil, Trash2 } from "lucide-react";

import { useTransition } from "react";
import TooltipWrapper from "../tooltip/tooltip-provider";
import { Modal } from "@/components/ui/modal";
import { AccountHolder } from "@prisma/client";
import useAddShare from "@/hooks/useMutation/useAddShare";
import useGetAccountHolders from "@/hooks/useQuery/useGetAccountHolders";
import AccountHolderSkeleton from "./account-holder-skeleton";
import useDeleteShare from "@/hooks/useMutation/useDeleteShare";
import { toast } from "sonner";

export function AccountHolders() {
  const [error, setError] = useState<string | null>(null);
  const [isDeleteShare, setDeleteShareModal] = useState<boolean>(false);
  const [isOpenAddShareModal, setOpenAddShareModal] = useState<boolean>(false);
  const [deleteShareEntryId, setDeleteShareEntryId] = useState<string>("");

  const [isDeletePending, setStartTransition] = useTransition();
  const [isAddSharePending, setStartAddingTransition] = useTransition();

  const addMutation = useAddShare();
  const deleteMutation = useDeleteShare();
  const { data: accountHoldersList, isLoading } = useGetAccountHolders();
  console.log(accountHoldersList);

  const [newEntry, setNewEntry] = useState<{
    name: string;
    boid: string;
  }>({
    name: "",
    boid: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newEntry.name || !newEntry.boid) {
      setError("All fields are required.");
      return;
    }

    setError(null);

    try {
      setStartAddingTransition(async () => {
        setOpenAddShareModal(false);

        //

        addMutation.mutateAsync({
          account_holder_name: newEntry.name,
          boid: newEntry.boid,
        });

        // clear the form
        setNewEntry({
          name: "",
          boid: "",
        });

        toast.success("Account holder added successfully");
      });
    } catch (error) {}
  };

  const toggleModal = () => {
    setDeleteShareModal(!isDeleteShare);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between px-7">
          <div>
            <CardTitle>Account Holders</CardTitle>
            <CardDescription>
              List of account holders and their details.
            </CardDescription>
          </div>

          <Dialog
            onOpenChange={setOpenAddShareModal}
            open={isOpenAddShareModal}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setOpenAddShareModal(true)}
              >
                Add New Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Account </DialogTitle>
                <DialogDescription>
                  Enter the details for the new account holder.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-5 py-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-left">
                      Account Holder Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newEntry.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="boid" className="text-left">
                      BOID
                    </Label>
                    <Input
                      id="boid"
                      name="boid"
                      value={newEntry.boid}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <div className="flex flex-col gap-2 w-full">
                    {error && <p className="text-red-500">{error}</p>}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isAddSharePending}
                    >
                      Add Account
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <AccountHolderSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Holder Name</TableHead>
                  <TableHead>BOID</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountHoldersList &&
                  accountHoldersList.map((entry: AccountHolder) => {
                    return (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div className="font-medium">
                            {entry.account_holder_name}
                          </div>
                        </TableCell>

                        <TableCell>{entry.boid.toString()} </TableCell>

                        <TableCell>
                          <div className="flex gap-2">
                            <TooltipWrapper body="Edit">
                              <span className="text-xs  rounded-full hover:cursor-pointer p-2">
                                <Pencil />
                              </span>
                            </TooltipWrapper>

                            <TooltipWrapper body="Delete">
                              <span
                                onClick={() => {
                                  toggleModal();
                                  setDeleteShareEntryId(entry.id);
                                }}
                                className="text-xs  rounded-full hover:cursor-pointer p-2"
                              >
                                <Trash2 />
                              </span>
                            </TooltipWrapper>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Modal
        onClose={toggleModal}
        title="Delete Share"
        description="Do you really want to delete ? "
        isOpen={isDeleteShare}
      >
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => setDeleteShareModal(false)}>
            Cancel
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            disabled={isDeletePending}
            onClick={() => {
              setStartTransition(async () => {
                deleteMutation.mutateAsync({ id: deleteShareEntryId });

                toast.success("Account holder deleted successfully");
                setDeleteShareModal(false);
              });
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
