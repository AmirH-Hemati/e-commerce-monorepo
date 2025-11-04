import axiosInstance from "@/lib/axiosInstance";

export async function getAllUsers() {
  const { data } = await axiosInstance.get("/users");

  return data.data;
}

export async function getUser(id: string) {
  const { data } = await axiosInstance.get(`/users/${id}`);

  return data.data;
}
