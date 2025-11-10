import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser as updateUserApi } from "../services/usersServices";
import { RegisterFull } from "@repo/validation";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ data, id }: { id: string; data: RegisterFull }) =>
      updateUserApi(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("successfully Updated User");
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { updateUser, isUpdating };
}
