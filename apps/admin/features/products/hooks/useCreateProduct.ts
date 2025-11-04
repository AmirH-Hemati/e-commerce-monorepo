import { createProduct as createProductApi } from "../services/productServices";
import { Product } from "@repo/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: (newProduct: Product) => createProductApi(newProduct),
    onSuccess: () => {
      toast.success("product successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err: any) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });

  return { createProduct, isCreating };
}
