import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import productsRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import AppError from "./utils/AppError.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.static("./src/public"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use("/api/v1/orders/checkout/webhooks", express.raw({ type: "*/*" }));
app.use(express.json());
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/users", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  return next(
    new AppError(`can't find this ${req.originalUrl} on this server!`, 400)
  );
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log("there was an error", err);
  res.status(500).json({
    message: err.message,
  });
});
export default app;
