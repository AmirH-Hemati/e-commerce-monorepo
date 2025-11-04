"use client";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authServices";
export function useUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const isAuthenticated = Boolean(user && !error);
  return { user, isLoading, isAuthenticated };
}
