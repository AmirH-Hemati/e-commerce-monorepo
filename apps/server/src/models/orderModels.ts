import mongoose, { Document, Query } from "mongoose";
import { Order } from "@repo/validation";

export interface OrderDocument extends Omit<Order, "_id">, Document {
  _id: mongoose.Types.ObjectId;
}

const orderSchema = new mongoose.Schema<OrderDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    orderItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        quantity: Number,
        selectedColor: String,
        selectedSize: String,
      },
    ],
    address: {
      email: String,
      phone: String,
      address: String,
      city: String,
    },
    totalAmount: Number,
    status: {
      type: String,
      enum: ["Pending", "Paid", "Processing", "Shipped", "Delivered"],
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre<Query<OrderDocument[], OrderDocument>>(
  /^find/,
  function (next) {
    this.populate("userId").populate({
      path: "orderItems.productId",
      model: "Product",
      select: "-sizes -colors -description",
    });

    next();
  }
);

export default mongoose.model("Order", orderSchema);
