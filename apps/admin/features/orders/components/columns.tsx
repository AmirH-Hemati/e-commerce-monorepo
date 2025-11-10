"use client";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { OrderClient } from "@repo/validation";
import Link from "next/link";

export const columns: ColumnDef<OrderClient>[] = [
  { accessorKey: "userId.email", header: "Email" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <div
          className={cn(
            "p-1 rounded-md w-max text-xs",
            status === "Pending" && "bg-red-500/40",
            status === "Paid" && "bg-green-500/40",
            status === "Processing" && "bg-yellow-500/40",
            status === "Shipped" && "bg-blue-500/40",
            status === "Delivered" && "bg-orange-500/40"
          )}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Order Date",
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount")) / 100;
      if (amount) {
        const formatedAmount = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right font-medium">{formatedAmount}</div>;
      } else {
        return <div className="text-right font-medium">not paid</div>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 ">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/users/${order?.userId?._id}`}>View customer</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/orders/${order._id}`}>View Order details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
