"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "../services/productServices";
import { toast } from "react-toastify";

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteProductApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("product successfully deleted");
    },

    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { deleteProduct, isDeleting };
}
