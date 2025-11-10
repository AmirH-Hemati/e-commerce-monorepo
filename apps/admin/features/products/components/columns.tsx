"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ProductClient } from "@repo/validation";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import AddProductForm from "./AddProductForm";
import DuplicatedProduct from "./DuplicatedProduct";

export const columns = (
  deleteProduct: (id: string) => void
): ColumnDef<ProductClient>[] => {
  return [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const product = row.original;
        const image = product.images[0];
        return (
          <div className="w-12 h-12 relative">
            <Image
              src={(image?.image as string) || ""}
              alt={product.name}
              fill
              unoptimized
              className=" rounded-sm object-cover"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },

    {
      accessorKey: "price",
      header: () => {
        return <Button variant="ghost">Price</Button>;
      },
    },
    {
      accessorKey: "category",
      header: "category",
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => deleteProduct(product._id)}
              >
                Delete Product
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Sheet>
                  <SheetTrigger className="w-full" asChild>
                    <SidebarMenuButton>Edit Product</SidebarMenuButton>
                  </SheetTrigger>

                  <AddProductForm product={product} />
                </Sheet>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DuplicatedProduct product={product} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
