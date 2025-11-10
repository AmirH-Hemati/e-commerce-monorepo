import { useQuery } from "@tanstack/react-query";
import { getlatestOrders } from "../services/orderServices";

export function useLatestOrders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["latestOrders"],
    queryFn: getlatestOrders,
  });

  return { orders, isLoading };
}
