import { z } from "zod";

export const productSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, { message: "Product name is required!" }),
  slug: z.string().optional(),
  shortDescription: z
    .string()
    .min(1, { message: "Short description is required!" })
    .max(60),
  description: z.string().min(1, { message: "Description is required!" }),
  price: z.number().min(1, { message: "Price is required!" }),
  category: z.string().min(1, { message: "category is required!" }),
  sizes: z.array(z.string()).min(1, { message: "sizes is required!" }),
  colors: z.array(z.string()).min(1, { message: "colors is required!" }),
  images: z
    .array(z.record(z.string(), z.string()))
    .min(1, { message: "images is required!" }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductsList = z.infer<typeof productSchema>[];

export type CartItemTypes = Product & {
  qty: number;
  selectedColor: string;
  selectedSize: string;
};
export type CartItemsTypes = CartItemTypes[];

export const addressSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email().min(1, "Email is required!"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 10 digits!")
    .max(11, "Phone number must be between 7 and 10 digits!")
    .regex(/^\d+$/, "Phone number must contain only numbers!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

export type Address = z.infer<typeof addressSchema>;
