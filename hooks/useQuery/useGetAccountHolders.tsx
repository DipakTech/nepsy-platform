import { AccountHolder } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAccountHolders = () => {
  const { data, isLoading, error } = useQuery<AccountHolder[]>({
    queryKey: ["accountHolders"],
    queryFn: async () => {
      const response = await axios.get("/api/accountHolder");
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export default useGetAccountHolders;
