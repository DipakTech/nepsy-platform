import { IpoResult } from "@/components/component/result/resultcheck";
import axios from "axios";
import { AllottedIPO } from "./share/updateUserShareData";

export const getCompanies = async () => {
  try {
    const response = await axios.get(
      "https://globalimecapital.com/api/share-allotment-check/getCompanies",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-ch-ua":
            '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          Referer: "https://globalimecapital.com/",
          "Referrer-Policy": "strict-origin",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
};
// interface ShareResult {
//   company_id: number;
//   boid: number;
//   result: any; // Replace 'any' with a more specific type if the result structure is known
// }

export const getResultsByBoids = async (
  companyId: number,
  boids: number[],
): Promise<IpoResult[]> => {
  const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    pragma: "no-cache",
    "sec-ch-ua":
      '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    Referer: "https://globalimecapital.com/",
    "Referrer-Policy": "strict-origin",
  };

  const results: IpoResult[] = [];

  await Promise.all(
    boids.map(async (boid) => {
      try {
        const response = await axios.post(
          "https://globalimecapital.com/api/share-allotment-check",
          {
            company_id: companyId,
            boid: boid,
          },
          { headers },
        );
        results.push({
          company_id: companyId,
          boid: boid,
          result: response.data,
        });
      } catch (error) {
        console.error(`Error fetching result for BOID ${boid}:`, error);
        results.push({
          company_id: companyId,
          boid: boid,
          result: null,
        });
      }
    }),
  );

  console.log(results);

  return results;
};

export const updateShares = async (allottedIPOs: AllottedIPO[]) => {
  try {
    const response = await axios.put("/api/share", allottedIPOs);
    return response.data;
  } catch (error) {
    console.error("Error updating shares:", error);
    throw error;
  }
};
