import { NextFunction, Request, Response } from "express";
import { fromZodError } from "zod-validation-error";
import AppError from "./AppError.js";
import { ZodType } from "zod";

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const messages = fromZodError(result.error).message;

      return next(new AppError(messages, 400));
    }
    next();
  };
}
