import { useQuery } from "@tanstack/react-query";
import { getLatestProducts } from "../services/productServices";

export function useLatestProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: getLatestProducts,
  });

  return { products, isLoading };
}
