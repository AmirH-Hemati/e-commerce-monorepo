import mongoose, { Document, Query } from "mongoose";
import slug from "slug";
import { ProductBase } from "@repo/validation";

export interface ProductDocument extends Document, ProductBase {
  slug: string;
}

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: [true, " نام محصول الزامی است"],
      unique: true,
    },
    slug: String,

    category: {
      type: String,
      required: [true, "دسته بندی  الزامی است"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },

    colors: [String],
    sizes: [String],
    shortDescription: {
      type: String,
      trim: true,
      required: [true, "توضیحات محصول الزامی است"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "توضیحات محصول الزامی است"],
    },

    images: [
      {
        color: String,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slug(this.name);
  }
  next();
});

productSchema.pre<Query<ProductDocument[], ProductDocument>>(
  /^find/,
  function (next) {
    this.populate("category");
    next();
  }
);

export default mongoose.model<ProductDocument>("Product", productSchema);
