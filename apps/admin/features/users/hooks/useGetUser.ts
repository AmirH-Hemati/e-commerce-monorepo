import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/usersServices";
import { useParams } from "next/navigation";

export function useGetUser() {
  const { userId } = useParams();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId as string),
  });

  return { user, isLoading };
}
