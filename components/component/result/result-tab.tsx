"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IPOResultModal, { Company } from "../Ipo-result-modal";
import { AccountHolder } from "@prisma/client";
import { ShareDataTable } from "@/app/dashboard/components/share-list-table";
import { useState, useTransition } from "react";
import { getCompanyName, IpoResult } from "./resultcheck";
import { addShareResult, getResultsByBoids } from "@/action/ipo-result";

type IPOResultModalProps = {
  companies: Company[];
  appliedShareList: AccountHolder[];
  accountHoldersWithShares: any[];
};

export const ResultTab: React.FC<IPOResultModalProps> = ({
  companies,
  appliedShareList,
  accountHoldersWithShares,
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedRowsData, setSelectedRowsData] = useState<AccountHolder[]>([]);

  const [isCheckingResult, startCheckingResult] = useTransition();
  const [bulkIpoResult, setBulkIpoResult] = useState<IpoResult[]>([]);

  // @ts-expect-error - need to refactor this to use types
  let formattedResponseData = [];

  accountHoldersWithShares.forEach((data: any) => {
    if (data.shares && data.shares.length > 0) {
      const formattedShares = data.shares.map((share: any) => {
        return {
          account_holder_name: data.account_holder_name,
          boid: data.boid,
          company_name: share.company_name,
          kitta: share.kitta,
          status: share.status,
        };
      });
      formattedResponseData.push(...formattedShares);
    }
  });

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
          company_name: getCompanyName(companies, res.company_id),
          boid: res.result!.allotted_data[0].boid,
          kitta: parseInt(res.result!.allotted_data[0].allotted_kitta),
        }));

      if (allottedIpos.length > 0) {
        await addShareResult(allottedIpos);
      }

      if (response.length) setBulkIpoResult(response);
    });
  };

  return (
    <Tabs defaultValue="checkipo" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="checkipo">check result</TabsTrigger>
        <TabsTrigger value="recentresult">Recent results</TabsTrigger>
      </TabsList>
      <TabsContent value="checkipo">
        <IPOResultModal
          appliedShareList={appliedShareList}
          companies={companies}
          bulkIpoResult={bulkIpoResult}
          setBulkIpoResult={setBulkIpoResult}
          selectedCompany={selectedCompany}
          handleCheck={handleCheck}
          // @ts-expect-error - need to refactor this
          selectedRowsData={selectedRowsData}
          setSelectedRowsData={setSelectedRowsData}
          isCheckingResult={isCheckingResult}
          setSelectedCompany={setSelectedCompany}
        />
      </TabsContent>
      <TabsContent value="recentresult">
        <ShareDataTable
          // @ts-expect-error - need to refactor this
          data={formattedResponseData}
          setSelectedRowsData={setSelectedRowsData}
        />
      </TabsContent>
    </Tabs>
  );
};
