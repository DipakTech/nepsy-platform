"use client";

import { useState } from "react";
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

export function IpoResultTable() {
  const [entries, setEntries] = useState([
    {
      name: "Liam Johnson",
      email: "liam@example.com",
      company: "Acme Inc",
      boid: "123456789",
      status: "Verified",
    },
    {
      name: "Olivia Smith",
      email: "olivia@example.com",
      company: "Globex Corporation",
      boid: "987654321",
      status: "Pending",
    },
    {
      name: "Noah Williams",
      email: "noah@example.com",
      company: "Stark Industries",
      boid: "456789123",
      status: "Verified",
    },
    {
      name: "Emma Brown",
      email: "emma@example.com",
      company: "Wayne Enterprises",
      boid: "789123456",
      status: "Pending",
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    name: "",
    email: "",
    company: "",
    boid: "",
    status: "Pending",
  });

  const handleInputChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (value) => {
    setNewEntry({ ...newEntry, status: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([...entries, newEntry]);
    setNewEntry({
      name: "",
      email: "",
      company: "",
      boid: "",
      status: "Pending",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between px-7">
        <div>
          <CardTitle>Account Holders</CardTitle>
          <CardDescription>
            List of account holders and their details.
          </CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add New Entry</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-slate-900">
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
                    Name
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
                  <Label htmlFor="company" className="text-left">
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={newEntry.company}
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
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Verified">Verified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button className="bg-slate-800 w-full" type="submit">
                  Add Entry
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>BOID</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{entry.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {entry.email}
                  </div>
                </TableCell>
                <TableCell>{entry.company}</TableCell>
                <TableCell>{entry.boid}</TableCell>
                <TableCell>
                  <Badge
                    className="text-xs"
                    variant={
                      entry.status === "Verified" ? "secondary" : "outline"
                    }
                  >
                    {entry.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
