import React from "react";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { ProductClient } from "@repo/validation";

export default function DuplicatedProduct({
  product,
}: {
  product: ProductClient;
}) {
  const { createProduct, isCreating } = useCreateProduct();
  function handelDublicatedProduct() {
    createProduct({
      name: `copy of ${product.name}`,
      category: product.category,
      price: product.price,
      colors: product.colors,
      sizes: product.sizes,
      shortDescription: product.shortDescription,
      description: product.description,
      images: product.images,
    });
  }

  return (
    <button disabled={isCreating} onClick={handelDublicatedProduct}>
      Dublicated Product
    </button>
  );
}
