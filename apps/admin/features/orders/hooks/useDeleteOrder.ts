import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder as deleteOrderApi } from "../services/orderServices";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: deleteOrder, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteOrderApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      toast.success("order successfully deleted");
      router.push("/orders");
    },

    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { deleteOrder, isDeleting };
}
