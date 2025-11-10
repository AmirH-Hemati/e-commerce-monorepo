import { baseProductSchema } from "./product";
import { z } from "zod";
import { registerFullSchema } from "./user";
export const baseOrderSchema = z.object({
  orderItems: z.array(
    z.object({
      _id: z.string(),
      productId: baseProductSchema,
      name: z.string(),
      quantity: z.number().min(1),
      selectedColor: z.string(),
      selectedSize: z.string(),
    })
  ),
  userId: registerFullSchema,
  address: z.object({
    email: z.email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
  }),
  totalAmount: z.number().min(0),
  status: z.enum(["Pending", "Paid", "Shipped", "delivered"]),
});
export const orderSchemaServer = baseOrderSchema.extend({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const orderSchemaClient = baseOrderSchema.extend({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type OrderSchema = z.infer<typeof baseOrderSchema>;
export type OrderClient = z.infer<typeof orderSchemaClient>;
export type Orderserver = z.infer<typeof orderSchemaServer>;

export type Orders = OrderClient[];
