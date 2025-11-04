import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { NextFunction, Request, Response } from "express";

const multerStorage = multer.memoryStorage();
function multerFilter(
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function
) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("you can only  uplpoad an Image", 400), false);
  }
}

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadImage = upload.single("image");
export const resizeImage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next(new AppError("there are no file exists", 400));

    const image = `product-${Date.now()}-cover.png`;
    const imagePath = `${req.protocol}://${req.get("host")}/img/products/${image}`;

    await sharp(req.file.buffer)
      .resize(800, 1200)
      .toFormat("png")
      .png({ quality: 90 })
      .toFile(`./src/public/img/products/${image}`);

    res.status(200).json({
      status: "sucess",
      link: imagePath,
    });
  }
);

export const deleteImage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.body;
    const imageName = path.basename(url);

    const imagePath = path.join("./src/public/img/products", imageName);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      return res.status(204).json({ message: "image successfully deleted" });
    }
    return res.status(404).json({ message: "image not found on this server" });
  }
);
