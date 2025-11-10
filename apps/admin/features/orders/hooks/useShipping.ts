import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateOrder } from "../services/orderServices";

export function useShipping() {
  const queryClient = useQueryClient();

  const { mutate: shipping, isPending: isShipping } = useMutation({
    mutationFn: (orderId: string) =>
      updateOrder({ status: "Shipped" }, orderId),
    onSuccess: () => {
      toast.success(`Order successfully Shipped`);
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },

    onError: () => toast.error(`There was an error while Shipped Order`),
  });

  return { shipping, isShipping };
}
