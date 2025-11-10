import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createUser as createUserApi } from "../services/usersServices";
import { RegisterFull } from "@repo/validation";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: (data: RegisterFull) => createUserApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("successfully Created User");
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { createUser, isCreating };
}
