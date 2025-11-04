import { useQuery } from "@tanstack/react-query";
import { getRecentOrder } from "../services/orderServices";
import { useParams } from "next/navigation";

export function useRecentOrder() {
  const { userId } = useParams();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["recentOrder", userId],
    queryFn: () => getRecentOrder(userId as string),
  });

  return { orders, isLoading };
}
