"use client";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/orderServices";

export function useGetOrders() {
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  console.log(orders);
  return { orders, isLoading, error };
}
