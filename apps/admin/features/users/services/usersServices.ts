import axiosInstance from "@/lib/axiosInstance";
import { RegisterFull } from "@repo/validation";

export async function getAllUsers() {
  const { data } = await axiosInstance.get("/users");

  return data.data;
}

export async function getUser(id: string) {
  const { data } = await axiosInstance.get(`/users/${id}`);

  return data.data;
}
export async function createUser(newUser: RegisterFull) {
  const { data } = await axiosInstance.post(`/users`, newUser);

  return data.data;
}
export async function updateUser(newUser: RegisterFull, id: string) {
  const { data } = await axiosInstance.patch(`/users/${id}`, newUser);

  return data.data;
}
