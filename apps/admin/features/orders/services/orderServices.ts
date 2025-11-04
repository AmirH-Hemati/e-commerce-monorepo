import axiosInstance from "@/lib/axiosInstance";
import { Orders } from "@repo/validation";

export async function getOrders(): Promise<Orders> {
  const { data } = await axiosInstance.get("/orders");

  return data.data;
}

export async function deleteOrder(id: string): Promise<object> {
  const { data } = await axiosInstance.delete(`/orders/${id}`);

  return data.data;
}

export async function getRecentOrder(userId: string): Promise<Orders> {
  const { data } = await axiosInstance.get(`/orders/recentOrder/${userId}`);

  return data.data;
}
export async function getOrdersStatus() {
  const { data } = await axiosInstance.get("/orders/stats/orderStatus");

  return data.data;
}
export async function getMonthlySales() {
  const { data } = await axiosInstance.get("/orders/stats/monthlySales");

  return data.data;
}
