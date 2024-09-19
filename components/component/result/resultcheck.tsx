import React, { SetStateAction, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import confetti from "canvas-confetti";
import { getCompanies } from "@/action/ipo-result";
import { Company } from "../Ipo-result-modal";
import BlurFade from "@/components/ui/BlurFade";

export interface IpoResult {
  company_id: number;
  boid: number;
  result: {
    allotted_data: {
      boid: string;
      allotted_kitta: string;
    }[];
    message: string;
  } | null;
}

export const getCompanyName = (companies: Company[], companyId: number) => {
  const company = companies.find(
    (company) => Number(company.id) === Number(companyId),
  );
  return company ? company.name : "Unknown Company";
};

interface BulkIpoResultProps {
  results: IpoResult[];
  setBulkIpoResult: (value: SetStateAction<IpoResult[]>) => void;
}

export default function BulkIpoResult({ results }: BulkIpoResultProps) {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const fetchedCompanies = await getCompanies();
      setCompanies(fetchedCompanies);
    };
    fetchCompanies();
  }, []);

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Bulk IPO Result</h1>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result, index) => {
          const firewalks = result.result?.message;
          let confettiActive = true;

          setTimeout(() => {
            confettiActive = false;
          }, 15000);

          if (firewalks && confettiActive) confetti();

          return (
            <div key={result.boid}>
              <Card key={index} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-md font-semibold">
                    {/* Company ID: {result.company_id} */}
                    {getCompanyName(companies, result.company_id)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-sm">
                    <span className="font-medium text-sm">BOID:</span>{" "}
                    {result.boid}
                  </p>
                  {result.result &&
                    result.result.allotted_data.map((data, dataIndex) => (
                      <BlurFade
                        key={dataIndex}
                        delay={0.04 * 6 + dataIndex * 0.05}
                      >
                        <div className="mb-2">
                          <p>
                            <span className="font-medium">Allotted Kitta:</span>{" "}
                            {data.allotted_kitta}
                          </p>
                        </div>
                      </BlurFade>
                    ))}
                  <p className="mt-4 text-green-600 font-semibold">
                    {result?.result?.message ?? "Sorry, you were not selected"}
                  </p>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
