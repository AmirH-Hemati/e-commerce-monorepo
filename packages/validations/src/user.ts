import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name in required" }),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  passwordConfirm: z
    .string()
    .min(8, { message: "confirmPassword is required!" })
    .optional(),
  photo: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type User = z.infer<typeof registerSchema>;
export type LoginFormInputs = z.infer<typeof loginSchema>;
