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
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import TooltipWrapper from "./tooltip/tooltip-provider";
import { Modal } from "../ui/modal";
import { deleteShareEntry } from "@/action/share/deleteShareEntry";
import { useTransition } from "react";
import { Company } from "./Ipo-result-modal";

interface Entry {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  account_holder_name: string;
  company_name: string;
  kitta: number;
  boid: string;
  status: string;
  userId: string | null;
}

export function IpoResultTable({
  appliedShareList,
  companies,
}: {
  appliedShareList: Entry[];
  companies: Company[];
}) {
  const [error, setError] = useState<string | null>(null);
  const [isDeleteShare, setDeleteShareModal] = useState<boolean>(false);
  const [isOpenAddShareModal, setOpenAddShareModal] = useState<boolean>(false);
  const [deleteShareEntryId, setDeleteShareEntryId] = useState<string>("");

  const [isDeletePending, setStartTransition] = useTransition();
  const [isAddSharePending, setStartAddingTransition] = useTransition();

  const [newEntry, setNewEntry] = useState<{
    name: string;
    company: string;
    kitta: string;
    boid: string;
    status: "Verified" | "Pending";
  }>({
    name: "",
    company: "",
    kitta: "",
    boid: "",
    status: "Pending",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (value: "Verified" | "Pending") => {
    setNewEntry({ ...newEntry, status: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Input validation
    if (
      !newEntry.name ||
      !newEntry.company ||
      !newEntry.kitta ||
      !newEntry.boid
    ) {
      setError("All fields are required.");
      return;
    }

    setError(null); // Clear any previous error

    try {
      setStartAddingTransition(async () => {
        await axios.post("/api/share", {
          account_holder_name: newEntry.name,
          boid: newEntry.boid,
          company_name: newEntry.company,
          kitta: newEntry.kitta,
          status: newEntry.status,
        });
        setOpenAddShareModal(false);
      });

      // Handle success (e.g., clear form, show success message)
    } catch (error) {
      // Handle error (e.g., show error message)
    }
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
                Add New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className=" bg-slate-900">
              <DialogHeader>
                <DialogTitle>Add New Entry</DialogTitle>
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

                  <div className="space-y-2">
                    <Label htmlFor="company">Select company</Label>
                    <Select
                      onValueChange={(val) => {
                        // @ts-expect-error: Necessary due to type mismatch
                        setNewEntry({ ...newEntry, company: Number(val) });
                      }}
                      value={newEntry.company ?? undefined}
                    >
                      <SelectTrigger id="company">
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((company) => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="kitta" className="text-left">
                      Applied kitta
                    </Label>
                    <Input
                      type="number"
                      id="kitta"
                      name="kitta"
                      value={newEntry.kitta}
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
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="status" className="text-left">
                      Status
                    </Label>
                    <Select
                      onValueChange={handleStatusChange}
                      defaultValue={newEntry.status}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ipoapplied">IPO Applied</SelectItem>
                        <SelectItem value="secondaryPurchase">
                          Secondary share purchase
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                      Add Entry
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Holder Name</TableHead>
                <TableHead className="hidden sm:block">
                  Applied Company
                </TableHead>
                <TableHead>Applied Kitta</TableHead>
                <TableHead className="hidden sm:block">BOID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appliedShareList.map((entry) => {
                return (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <div className="font-medium">
                        {entry.account_holder_name}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:block">
                      {entry.company_name}
                    </TableCell>
                    <TableCell>10</TableCell>
                    <TableCell className="hidden sm:block">
                      {entry.boid.toString()}{" "}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="text-xs"
                        variant={
                          entry.status === "APPLIED" ? "secondary" : "outline"
                        }
                      >
                        {entry.status}
                      </Badge>
                    </TableCell>
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
                await deleteShareEntry(deleteShareEntryId);
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
