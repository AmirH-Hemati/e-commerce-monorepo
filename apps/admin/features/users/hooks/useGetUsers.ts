import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/usersServices";

export function useGetUsers() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return { users, isLoading };
}
