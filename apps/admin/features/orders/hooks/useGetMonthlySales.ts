"use client";
import { useQuery } from "@tanstack/react-query";
import { getMonthlySales } from "../services/orderServices";

export function useGetMonthlySales() {
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["monthlySales"],
    queryFn: getMonthlySales,
  });
  return { orders, isLoading, error };
}
