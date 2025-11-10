import axiosInstance from "@/lib/axiosInstance";
import { LoginFormInputs } from "@repo/validation";

export async function login(data: LoginFormInputs) {
  const { data: responseData } = await axiosInstance.post("/users/login", data);

  return responseData;
}
