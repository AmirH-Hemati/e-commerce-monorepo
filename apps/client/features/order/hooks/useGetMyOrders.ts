import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../services/orderServices";

export function useGetMyOrders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });

  return { orders, isLoading };
}
