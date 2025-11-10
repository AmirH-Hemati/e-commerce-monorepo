import { createProduct as createProductApi } from "../services/productServices";
import { ProductBase } from "@repo/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: ({ newProduct, id }: { newProduct: ProductBase; id: string }) =>
      createProductApi(newProduct, id),
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

  return { updateProduct, isUpdating };
}
