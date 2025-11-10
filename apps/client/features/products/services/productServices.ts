import { ProductClient, ProductsList } from "@repo/validation";

export async function getProducts(category: string): Promise<ProductsList> {
  const data = await fetch(
    `http://localhost:4000/api/v1/products?${category && category !== "all" ? `category=${category}` : ""}`
  );
  const products = (await data.json()).data;

  return products;
}

export async function getProduct(id: string): Promise<ProductClient> {
  const data = await fetch(`http://localhost:4000/api/v1/products/${id}`);
  const product = (await data.json()).data;

  return product;
}
