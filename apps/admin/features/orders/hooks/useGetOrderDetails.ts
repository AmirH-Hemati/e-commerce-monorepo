"use client";
import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../services/orderServices";
import { useParams } from "next/navigation";

export function useGetOrderDetails() {
  const { orderId } = useParams();
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrder(orderId as string),
  });

  return { order, isLoading, error };
}
