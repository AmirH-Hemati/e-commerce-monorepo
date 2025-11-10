"use client";
import { DataTable } from "@/components/DataTable";
import { columns as productColumns } from "../../../features/products/components/columns";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useDeleteProduct } from "@/features/products/hooks/useDeleteProduct";
import Spinner from "@/components/Spinner";

export default function Page() {
  const { products, isLoading } = useProducts();
  const { deleteProduct, isDeleting } = useDeleteProduct();
  if (isLoading) {
    return <Spinner />;
  }
  const columns = productColumns(deleteProduct);
  return (
    <div>
      <div className="">
        <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
          <h1 className="font-semibold">All Products</h1>
        </div>
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}
