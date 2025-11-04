import multer from "multer";
import sharp from "sharp";

import {
  getAll,
  createOne,
  getOne,
  deleteOne,
  updateOne,
} from "./handlerFactory.js";

import Product, { ProductDocument } from "../models/productModels.js";

import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("لطفا فقط عکس اپلود کنید .", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadProductImage = upload.single("images");

export const resizeProductImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.imageCover = `product-${Date.now()}-cover.png`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("png")
    .png({ quality: 90 })
    .toFile(`public/img/products/${req.body.imageCover}`);

  next();
});

// exports.findCategoryIdByValue = catchAsync(async (req, res, next) => {
//   const { category } = req.query;
//   if (!category) return next();

//   const categoryDoc = await Category.findOne({ value: category });

//   if (!categoryDoc) {
//     return next(new AppError("دسته بندی یافت نشد", 404));
//   }

//   req.queryFilter = { ...req.query, category: categoryDoc._id };
//   next();
// });

// export const getProductByIds = catchAsync(async (req, res, next) => {
//   const { ids } = req.body;
//   const products = await Product.find({ _id: { $in: ids } });
//   res.status(200).json({
//     status: "success",
//     data: products,
//   });
// });

export const getProducts = getAll<ProductDocument>(Product);
export const getProduct = getOne<ProductDocument>(Product);
export const createProduct = createOne<ProductDocument>(Product);
export const updateProduct = updateOne<ProductDocument>(Product);
export const deleteProduct = deleteOne<ProductDocument>(Product);
