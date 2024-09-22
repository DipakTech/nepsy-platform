import { queryClient } from "@/app/QueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface DeleteShareVariables {
  id: string;
}

const useDeleteShare = () => {
  const mutation = useMutation<any, unknown, DeleteShareVariables>({
    mutationFn: async ({ id }) => {
      const response = await axios.delete(`/api/accountHolder/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accountHolders"],
      });
    },
  });

  return mutation;
};

export default useDeleteShare;
