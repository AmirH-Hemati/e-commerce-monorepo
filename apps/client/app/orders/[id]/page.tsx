"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";

const orders = [
  {
    id: "ORD-00123",
    date: "2025-10-12",
    total: 249.99,
    status: "delivered",
    address: "Tehran, Vanak, Argentina Sq, No. 45",
    payment: "Online",
    items: [
      {
        name: "Wireless Headset",
        image: "/products/headset.jpg",
        price: 99.99,
        quantity: 1,
      },
      {
        name: "RGB Gaming Mouse",
        image: "/products/mouse.jpg",
        price: 59.99,
        quantity: 2,
      },
    ],
  },
  {
    id: "ORD-00124",
    date: "2025-10-15",
    total: 89.99,
    status: "pending",
    address: "Mashhad, Vakilabad Blvd, No. 8",
    payment: "Cash on Delivery",
    items: [
      {
        name: "Mechanical Keyboard",
        image: "/products/keyboard.jpg",
        price: 89.99,
        quantity: 1,
      },
    ],
  },
];

export default function OrderDetailPage() {
  const { id } = useParams();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 text-center text-gray-600">
        <p>Order not found.</p>
        <Link href="/orders" className="text-yellow-500 hover:text-yellow-600">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Order Details
        </h1>
        <Link
          href="/orders"
          className="text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← Back to Orders
        </Link>
      </div>

      {/* Order Info */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-wrap justify-between gap-3">
          <p>
            <span className="font-medium text-gray-800">Order ID:</span>{" "}
            {order.id}
          </p>
          <p>
            <span className="font-medium text-gray-800">Date:</span>{" "}
            {order.date}
          </p>
          <p>
            <span className="font-medium text-gray-800">Payment:</span>{" "}
            {order.payment}
          </p>
          <p>
            <span className="font-medium text-gray-800">Status:</span>{" "}
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                order.status === "delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {order.status === "delivered" && (
                <CheckCircle className="w-4 h-4" />
              )}
              {order.status === "pending" && <Clock className="w-4 h-4" />}
              {order.status === "failed" && <XCircle className="w-4 h-4" />}
              {order.status}
            </span>
          </p>
        </div>

        <p className="mt-4 text-gray-700">
          <span className="font-medium">Shipping Address:</span> {order.address}
        </p>
      </div>

      {/* Items */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="border-b border-gray-100 px-6 py-3">
          <h2 className="font-semibold text-gray-800">Items</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition"
            >
              <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end px-6 py-4 border-t border-gray-100">
          <p className="font-semibold text-gray-900">
            Total: ${order.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
