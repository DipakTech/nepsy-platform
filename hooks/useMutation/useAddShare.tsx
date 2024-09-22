import { queryClient } from "@/app/QueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useAddShare = () => {
  const mutation = useMutation<
    any,
    unknown,
    {
      account_holder_name: string;
      boid: string;
    },
    unknown
  >({
    mutationFn: async ({ account_holder_name, boid }) =>
      await axios.post("/api/accountHolder", {
        account_holder_name,
        boid,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accountHolders"],
      });
    },
  });

  return mutation;
};

export default useAddShare;
