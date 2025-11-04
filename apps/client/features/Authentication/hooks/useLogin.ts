import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/authServices";
import { LoginFormInputs } from "@repo/validation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (data: LoginFormInputs) => loginApi(data),

    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Welcome");
      router.push("/");
    },

    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return { login, isPending };
}
