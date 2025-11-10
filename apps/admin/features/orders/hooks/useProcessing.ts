import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateOrder } from "../services/orderServices";

export function useProcessing() {
  const queryClient = useQueryClient();

  const { mutate: processing, isPending: isProcessing } = useMutation({
    mutationFn: (orderId: string) =>
      updateOrder({ status: "Processing" }, orderId),
    onSuccess: () => {
      toast.success(`Order  successfully processing`);
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },

    onError: () => toast.error(`There was an error while Processing Order`),
  });

  return { processing, isProcessing };
}
