import axiosInstance from "@/lib/axiosInstance";
import { ProductBase } from "@repo/validation";

export async function getProducts() {
  const { data } = await axiosInstance.get("/products");
  return data.data;
}

export async function getProduct(productId: string) {
  const { data } = await axiosInstance.get(`/products/${productId}`);

  return data;
}

export async function createProduct(
  newProduct: ProductBase,
  productId?: string
) {
  const url = productId ? `/products/${productId}` : "/products";
  const method = productId ? `patch` : "post";
  const { data } = await axiosInstance({ url, method, data: newProduct });
  console.log(data);
  return data;
}

export async function deleteProduct(productId: string) {
  const { data } = await axiosInstance.delete(`/products/${productId}`);

  return data;
}
export async function getLatestProducts() {
  const { data } = await axiosInstance.get("/products?limit=6");
  return data.data;
}
