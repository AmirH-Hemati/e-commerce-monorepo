import mongoose, { Document, Query, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { RegisterServer } from "@repo/validation";
export interface UserDocument extends Document, RegisterServer {
  _id: Types.ObjectId;
  role: string;
  photo: string;
  active: boolean;
  passwordConfirm: string | undefined;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}
const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "user must Have A Name "],
    },

    email: {
      type: String,
      required: [true, "user must Have A Name "],
      unique: true,
      lowercase: true,
    },
    photo: {
      type: String,
      default: "default.png",
    },

    role: {
      type: String,
      enum: ["user", "writer", "admin"],
      default: "user",
    },

    password: {
      type: String,
      required: [true, "please Provide a  Password ! "],
      minlength: 8,
      select: false,
    },

    passwordConfirm: {
      type: String,
      minlength: 8,
      required: [true, "please confirm your password  "],
      validate: {
        validator: function (value: string): boolean {
          return value === this.password;
        },
        message: "Password are not the same !",
      },
      select: false,
    },

    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre<Query<[], []>>(/^find/, function (next) {
  this.find({ active: { $ne: false } });

  next();
});

userSchema.methods.correctPassword = async function (
  password: string,
  currentPassword: string
) {
  return await bcrypt.compare(password, currentPassword);
};

export default mongoose.model<UserDocument>("User", userSchema);
