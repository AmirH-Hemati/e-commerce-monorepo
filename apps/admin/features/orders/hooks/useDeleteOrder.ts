import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder as deleteOrderApi } from "../services/orderServices";
import { toast } from "react-toastify";

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const { mutate: deleteOrder, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteOrderApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      toast.success("order successfully deleted");
    },

    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { deleteOrder, isDeleting };
}
