"use client";
import Image from "next/image";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useGetMyOrders } from "@/features/order/hooks/useGetMyOrders";
import { OrderClient } from "@repo/validation";

export default function MyOrdersPage() {
  const { orders, isLoading } = useGetMyOrders();
  if (isLoading) return <p>isloading</p>;
  return (
    <div className="  py-10 px-4  ">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
        My Orders
      </h1>

      <div className="space-y-6 ">
        {orders &&
          orders.map((order: OrderClient) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Order ID: <span className="font-medium">{order._id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Order Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US")}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-3 md:mt-0">
                  <span className="text-sm font-medium text-gray-800">
                    Total: ${order?.totalAmount?.toFixed(2) || "Not Paid"}
                  </span>

                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status === "delivered" && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {order.status === "Pending" && (
                      <Clock className="w-4 h-4" />
                    )}
                    {order.status === "Paid" && <XCircle className="w-4 h-4" />}
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="divide-y max-h-40 divide-gray-100 overflow-y-auto">
                {order.orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex   items-center gap-4 p-4 hover:bg-gray-50 transition"
                  >
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-100">
                      <Image
                        src={item.productId.images[idx]?.image || ""}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1  space-y-0.5">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">
                          Color: {item.selectedColor},
                        </p>
                        <p className="text-sm text-gray-500">
                          Size: {item.selectedSize}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ${item.productId.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 bg-gray-50 p-3">
                {order.status === "delivered" && (
                  <button className="text-sm text-yellow-500 border border-yellow-400 rounded-lg px-3 py-1 hover:bg-yellow-50 transition">
                    Buy Again
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
