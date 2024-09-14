import axios from "axios";

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

export const getResultByBoid = async (companyId: number, boid: number) => {
  try {
    const response = await axios.post(
      "https://globalimecapital.com/api/share-allotment-check",
      {
        company_id: companyId,
        boid: boid,
      },
      {
        headers: {
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
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching result by BOID:", error);
    return null;
  }
};
