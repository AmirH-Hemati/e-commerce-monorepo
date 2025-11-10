import { promisify } from "util";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import UserModel, { UserDocument } from "../models/userModel.js";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: UserDocument;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET as string;

const JWT_EXPIRES_IN = 7 * 24 * 60 * 60;
const createSendToken = (
  res: Response,
  id: Types.ObjectId,
  user: UserDocument
) => {
  const signOptions: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
  };
  const token = jwt.sign({ id }, JWT_SECRET, signOptions);

  const option: { expires: Date; httpOnly: boolean; secure?: boolean } = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if ((process.env.NODE_ENV as string) === "production") option.secure = true;

  console.log("login", token);
  res.cookie("token", token, option);
  res.status(201).json({
    status: "success",
    token,
    user,
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(res, newUser._id as Types.ObjectId, newUser);
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("please provide email and password !", 400));
    }
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password!", 401));
    }
    createSendToken(res, user._id as Types.ObjectId, user);
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return next(
        new AppError("You are not logged in ! plase log in to get accsess", 401)
      );
    }
    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const currentUser = await UserModel.findById(decode.id);
    if (!currentUser) {
      return next(
        new AppError(
          "user with token not found pls again login your account",
          401
        )
      );
    }

    req.user = currentUser;
    next();
  }
);

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req?.user?.role || "")) {
      return next(new AppError("You dont have permission to this route", 403));
    }
    next();
  };
};

export const updateMyPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findById(req?.user?._id || "").select(
      "+password"
    );
    if (!user) {
      return next(new AppError("user not found", 404));
    }
    if (!(await user.correctPassword(req.body.password, user.password))) {
      return next(new AppError("Your current password is wrong ! ", 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    res.status(200).json({
      status: "success",

      data: { user },
    });
  }
);
