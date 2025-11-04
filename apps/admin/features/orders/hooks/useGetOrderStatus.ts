"use client";
import { useQuery } from "@tanstack/react-query";
import { getOrdersStatus } from "../services/orderServices";

export function useGetOrderStatus() {
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ordersStatus"],
    queryFn: getOrdersStatus,
  });
  return { orders, isLoading, error };
}
