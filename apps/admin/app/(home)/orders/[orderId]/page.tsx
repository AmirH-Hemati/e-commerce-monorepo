"use client";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Badge } from "@/components/ui/badge";

import { useGetOrderDetails } from "@/features/orders/hooks/useGetOrderDetails";

import { useRouter } from "next/navigation";
import { useProcessing } from "@/features/orders/hooks/useProcessing";
import { useShipping } from "@/features/orders/hooks/useShipping";
import { useDelivering } from "@/features/orders/hooks/useDelivering";
import { useDeleteOrder } from "@/features/orders/hooks/useDeleteOrder";
import OrderDataBox from "@/features/orders/components/OrderDataBox";
import Spinner from "@/components/Spinner";

export default function Page() {
  const { order, isLoading } = useGetOrderDetails();
  const { processing, isProcessing } = useProcessing();
  const { shipping, isShipping } = useShipping();
  const { deleteOrder, isDeleting } = useDeleteOrder();
  const { delivering, isDelivering } = useDelivering();
  const router = useRouter();
  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/orders">orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Order Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {order && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl my-5">Order #165987</h1>
            <Badge>{order?.status}</Badge>
          </div>
          <OrderDataBox order={order} />
          <div className="ml-auto my-4 space-x-2">
            {order?.status === "Paid" && (
              <Button
                disabled={isProcessing}
                className="cursor-pointer"
                onClick={() => processing(order._id)}
              >
                Processing
              </Button>
            )}
            {/* {order?.status === "Processing" && (
          <Button
            disabled={isShipping}
            className="cursor-pointer"
            onClick={() => shipping(order._id)}
          >
            Shipped
          </Button>
        )} */}
            {order?.status === "Shipped" && (
              <Button
                className="cursor-pointer"
                disabled={isDelivering}
                onClick={() => delivering(order._id)}
              >
                Delivered
              </Button>
            )}
            <Button
              disabled={isDeleting}
              variant="destructive"
              className="cursor-pointer"
              onClick={() => deleteOrder(order?._id)}
            >
              delete
            </Button>

            <Button
              onClick={() => router.back()}
              variant="outline"
              className="cursor-pointer"
            >
              Back
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
