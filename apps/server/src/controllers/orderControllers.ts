import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

import { Address, CartItemsTypes, CartItemTypes } from "@repo/validation";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import Order, { OrderDocument } from "../models/orderModels.js";
import ProductModel from "../models/productModels.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { Types } from "mongoose";

const stripe = new Stripe(process.env.STRIPE_KEY as string);

export const stripeWebhookHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let event;
    try {
      const sig = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(
        req.body,
        sig as string,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (error: any) {
      return next(new AppError(`webhook Error ${error.message}`, 400));
    }
    if (event.type === "checkout.session.completed") {
      const order = await Order.findById(event.data.object.metadata?.orderId);
      if (!order) {
        return next(new AppError("Order not found", 404));
      }
      order.totalAmount = event.data.object.amount_total as number;
      order.status = "Paid";
      await order.save();
    }
    res.status(200).json({ status: "success", data: null });
  }
);
export const orderProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      cartItem,
      address,
    }: { cartItem: CartItemsTypes; address: Address } = req.body;

    const orderItem = cartItem.map((item) => ({
      productId: item._id,
      name: item.name,
      quantity: item.qty,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    }));

    const order = new Order({
      userId: req.user._id,
      orderItems: orderItem,
      status: "Pending",
      address,
    });

    const line_items = await createLineItems(cartItem, next);

    const session = await createCheckoutSession(
      line_items,
      order._id.toString()
    );

    await order.save();
    if (!session.url) {
      return next(new AppError("There are was error in checkout session", 400));
    }

    res.status(200).json({ status: "success", url: session.url });
  }
);

const createLineItems = async (
  cartItem: CartItemsTypes,
  next: NextFunction
): Promise<Stripe.Checkout.SessionCreateParams.LineItem[]> => {
  const lineItems = await Promise.all(
    cartItem.map(async (item: CartItemTypes) => {
      const product = await ProductModel.findById(item._id);
      if (!product) {
        throw new AppError(`product with id not found ${item._id}`, 404);
      }
      const line_items: Stripe.Checkout.SessionCreateParams.LineItem = {
        price_data: {
          product_data: {
            name: item.name,
            description: item.shortDescription,
          },
          currency: "usd",
          unit_amount: product.price * 100,
        },
        quantity: item.qty,
      };

      return line_items;
    })
  );

  return lineItems;
};

const createCheckoutSession = async (
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string
) => {
  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    line_items,
    mode: "payment",
    metadata: {
      orderId,
    },
  });
  return session;
};

export const getMyOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user.id);
    const order = await Order.find({ userId: req.user.id });
    res.status(200).json({
      status: "success",
      data: order,
    });
  }
);

export const getRecentOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json({
      status: "success",
      data: orders,
    });
  }
);

export const getMonthlySales = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.aggregate([
      {
        $match: {
          status: "Paid",
        },
      },
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          totalAmount: {
            $sum: "$totalAmount",
          },
          totalOrder: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          totalAmount: 1,
          totalOrder: 1,
          month: "$_id",
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: orders,
    });
  }
);
export const getOrderStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          status: "$_id",
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: orders,
    });
  }
);

export const getOrders = getAll<OrderDocument>(Order);
export const getOrder = getOne<OrderDocument>(Order);
export const createOrder = createOne<OrderDocument>(Order);
export const updateOrder = updateOne<OrderDocument>(Order);
export const deleteOrder = deleteOne<OrderDocument>(Order);
