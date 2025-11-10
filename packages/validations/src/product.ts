import { z } from "zod";

export const baseProductSchema = z.object({
  name: z.string().min(1, { message: "Product name is required!" }),
  shortDescription: z
    .string()
    .min(1, { message: "Short description is required!" })
    .max(60),
  description: z.string().min(1, { message: "Description is required!" }),
  price: z.number().min(1, { message: "Price is required!" }),
  category: z.string().min(1, { message: "Category is required!" }),
  sizes: z.array(z.string()).min(1, { message: "Sizes is required!" }),
  colors: z.array(z.string()).min(1, { message: "Colors is required!" }),
  images: z
    .array(z.record(z.string(), z.string()))
    .min(1, { message: "images is required!" }),
});

export const productSchemaServer = baseProductSchema;
export const productSchemaClient = baseProductSchema.extend({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProductBase = z.infer<typeof baseProductSchema>;
export type ProductClient = z.infer<typeof productSchemaClient>;
export type ProductServer = z.infer<typeof productSchemaServer>;

export type ProductsList = z.infer<typeof productSchemaClient>[];

export type CartItemTypes = ProductClient & {
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
