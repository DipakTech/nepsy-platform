"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import SubmitButton from "./submit-button";
// import { ShareDataTable } from "@/app/dashboard/components/share-list-table";
import { AccountHolder, Share } from "@prisma/client";
import BulkIpoResult, { IpoResult } from "./result/resultcheck";
import { Dispatch, SetStateAction } from "react";
import { AccountHoldersDataTable } from "@/app/dashboard/components/account-holders-table";

export type Company = {
  id: string;
  name: string;
};

type IPOResultModalProps = {
  companies: Company[];
  appliedShareList: AccountHolder[];
  bulkIpoResult: IpoResult[];
  setBulkIpoResult: (value: SetStateAction<IpoResult[]>) => void;
  selectedCompany: string | null;
  handleCheck: () => void;
  selectedRowsData: Share[];
  setSelectedRowsData: Dispatch<SetStateAction<AccountHolder[]>>;
  isCheckingResult: boolean;
  setSelectedCompany: (value: string) => void;
};

const IPOResultModal: React.FC<IPOResultModalProps> = ({
  companies,
  appliedShareList,
  bulkIpoResult,
  handleCheck,
  isCheckingResult,
  selectedCompany,
  selectedRowsData,
  setBulkIpoResult,
  setSelectedCompany,
  setSelectedRowsData,
}) => {
  return (
    <div className="flex flex-col mt-10 ">
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
    </div>
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
  appliedShareList: AccountHolder[];
  selectedCompany: string | null;
  setSelectedCompany: (value: string) => void;
  handleCheck: () => void;
  selectedRowsData: Share[];
  setSelectedRowsData: (value: AccountHolder[]) => void;
  isCheckingResult: boolean;
};

const ModalBody: React.FC<ModalBodyProps> = ({
  companies,
  appliedShareList,
  selectedCompany,
  setSelectedCompany,
  handleCheck,
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
    <AccountHoldersDataTable
      data={appliedShareList}
      setSelectedRowsData={setSelectedRowsData}
    />

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
