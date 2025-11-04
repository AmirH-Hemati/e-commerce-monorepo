import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../services/authServices";
import { User } from "@repo/validation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useSignup() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: (data: User) => signupApi(data),

    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Successfulluy Created Account!");
      router.push("/");
    },

    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return { signup, isPending };
}
