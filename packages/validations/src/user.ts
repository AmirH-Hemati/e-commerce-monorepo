import { z } from "zod";

export const baseRegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const registerSchemaServer = baseRegisterSchema;

export const registerSchemaClient = baseRegisterSchema
  .extend({
    passwordConfirm: z
      .string()
      .min(8, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export const registerFullSchema = baseRegisterSchema.extend({
  _id: z.string(),
  photo: z.string(),
  role: z.enum(["user", "admin"]),
});

// export const editUserSchema = z.object({
//   _id: z.string().min(1, { message: "User ID is required" }),
// });

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterFull = z.infer<typeof registerFullSchema>;
export type RegisterServer = z.infer<typeof registerSchemaServer>;
export type RegisterClient = z.infer<typeof registerSchemaClient>;
export type LoginFormInputs = z.infer<typeof loginSchema>;

// export type EditUser = z.infer<typeof editUserSchema>;
