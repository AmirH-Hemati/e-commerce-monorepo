import { NextFunction, Request, Response } from "express";
import { productSchema } from "@repo/validation";
import AppError from "./AppError.js";
export function validate(schema: typeof productSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      console.log(result.error);
      return next(new AppError("validation error for create a product", 400));
    }
    next();
  };
}
