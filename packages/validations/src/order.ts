import { z } from "zod";

const orderSchema = z.object({
  _id: z.string().optional(),
  userId: z.string().optional(),
  orderItems: z.array(
    z.object({
      productId: z.string(),
      name: z.string(),
      quantity: z.number().min(1),
    })
  ),
  address: z.object({
    email: z.email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
  }),
  totalAmount: z.number().min(0),
  status: z.enum(["Pending", "Paid", "Shipped", "delivered"]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Order = z.infer<typeof orderSchema>;
export type Orders = Order[];
