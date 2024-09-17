"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import SubmitButton from "./submit-button";
import { ShareDataTable } from "@/app/dashboard/components/share-list-table";
import { Share } from "@prisma/client";

import { useTransition } from "react";
import { getResultsByBoids, updateShares } from "@/action/ipo-result";
import BulkIpoResult, { IpoResult } from "./result/resultcheck";

export type Company = {
  id: string;
  name: string;
};

type IPOResultModalProps = {
  companies: Company[];
  appliedShareList: Share[];
};

const IPOResultModal: React.FC<IPOResultModalProps> = ({
  companies,
  appliedShareList,
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedRowsData, setSelectedRowsData] = useState<Share[]>([]);

  const [isCheckingResult, startCheckingResult] = useTransition();
  const [bulkIpoResult, setBulkIpoResult] = useState<IpoResult[]>([]);

  const handleCheck = () => {
    const boids = selectedRowsData.map((share) => Number(share.boid));
    startCheckingResult(async () => {
      const response: IpoResult[] = await getResultsByBoids(
        Number(selectedCompany),
        boids,
      );

      const allottedIpos = response
        .filter((res) => res.result?.message === "Congratulations!!")
        .map((res) => ({
          boid: res.result!.allotted_data[0].boid,
          allotted_kitta: parseInt(
            res.result!.allotted_data[0].allotted_kitta,
            10,
          ),
        }));

      if (allottedIpos.length > 0) {
        await updateShares(allottedIpos);
      }

      if (response.length) setBulkIpoResult(response);
    });
  };

  return (
    <Dialog onOpenChange={() => setBulkIpoResult([])}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-fit">
          Check IPO Result
        </Button>
      </DialogTrigger>
      <DialogContent className="text-white max-w-3xl border-none">
        <ModalHeader />
        {bulkIpoResult.length ? (
          <BulkIpoResult
            results={bulkIpoResult}
            setBulkIpoResult={setBulkIpoResult}
          />
        ) : (
          <ModalBody
            companies={companies}
            appliedShareList={appliedShareList}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            handleCheck={handleCheck}
            selectedRowsData={selectedRowsData}
            setSelectedRowsData={setSelectedRowsData}
            isCheckingResult={isCheckingResult}
          />
        )}
        <ModalFooter />
      </DialogContent>
    </Dialog>
  );
};

const ModalHeader: React.FC = () => (
  <div className="text-center">
    <h1 className="text-2xl text-slate-700 dark:text-white  font-bold">
      Check<span className="text-red-600">IPO</span>
    </h1>
    <p className="text-lg text-slate-700 dark:text-white">Check Share Result</p>
  </div>
);

type ModalBodyProps = {
  companies: Company[];
  appliedShareList: Share[];
  selectedCompany: string | null;
  setSelectedCompany: (value: string) => void;
  handleCheck: () => void;
  selectedRowsData: Share[];
  setSelectedRowsData: (value: Share[]) => void;
  isCheckingResult: boolean;
};

const ModalBody: React.FC<ModalBodyProps> = ({
  companies,
  appliedShareList,
  selectedCompany,
  setSelectedCompany,
  handleCheck,
  // selectedRowsData,
  setSelectedRowsData,
  isCheckingResult,
}) => (
  <div className="space-y-4 mt-4">
    <div className="space-y-2">
      <Label htmlFor="company">Select company</Label>
      <Select
        onValueChange={setSelectedCompany}
        value={selectedCompany ?? undefined}
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
    <ShareDataTable
      data={appliedShareList}
      // selectedRowsData={selectedRowsData}
      setSelectedRowsData={setSelectedRowsData}
    />
    ,
    <SubmitButton
      isDisabled={isCheckingResult}
      className="w-full"
      handleClick={handleCheck}
      bodyText="Check bulk IPO results"
    />
  </div>
);

const ModalFooter: React.FC = () => (
  <p className="mt-4 text-center text-xs text-muted-foreground">
    © {new Date().getFullYear()}. All Rights Reserved
  </p>
);

export default IPOResultModal;
