import sharp from "sharp";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import multer from "multer";
import { deleteOne, getAll, getOne, updateOne } from "./handlerFactory.js";
import UserModel, { UserDocument } from "../models/userModel.js";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images. ", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const uploadImage = upload.single("photo");
const resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/user/${req.file.filename}`);

  next();
};
export const getMe = (req: Request, res: Response, next: NextFunction) => {
  req.params.id = req.user._id.toString();
  console.log(req.params.id);
  next();
};

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return new AppError(
      "This route is not for password updates. please use /updateMyPassword ",
      400
    );
  }
  const updateUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, email: req.body.email, photo: req?.file?.filename },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const createUser = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup ",
  });
});

export const getAllUser = getAll<UserDocument>(UserModel);
export const getUser = getOne<UserDocument>(UserModel);
export const updateUser = updateOne<UserDocument>(UserModel);
export const deleteUser = deleteOne<UserDocument>(UserModel);
