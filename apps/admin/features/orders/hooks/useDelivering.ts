import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateOrder } from "../services/orderServices";

export function useDelivering() {
  const queryClient = useQueryClient();

  const { mutate: delivering, isPending: isDelivering } = useMutation({
    mutationFn: (orderId: string) =>
      updateOrder({ status: "Delivered" }, orderId),
    onSuccess: () => {
      toast.success(`Order  successfully Delivered`);
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },

    onError: () => toast.error(`There was an error while Delivered Order`),
  });

  return { delivering, isDelivering };
}
