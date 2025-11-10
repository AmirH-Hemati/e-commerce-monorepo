import express from "express";
import {
  login,
  protect,
  signup,
  updateMyPassword,
} from "../controllers/authControllers.js";
import {
  getUser,
  createUser,
  deleteUser,
  getAllUser,
  updateUser,
  deleteMe,
  getMe,
} from "../controllers/userControllers.js";
import { validate } from "../utils/validate.js";
import { registerSchemaServer, loginSchema } from "@repo/validation";

const router = express.Router();
router.post("/signup", validate(registerSchemaServer), signup);
router.post("/login", validate(loginSchema), login);

router.use(protect);

router.patch("/updateMyPassword", updateMyPassword);
router.get("/me", getMe, getUser);
// router.patch("/updateMe", uploadImage, resizeUserPhoto, updateMe);
router.delete("/deleteMe", deleteMe);

// router.use(restrictTo("admin"));
router.route("/").get(getAllUser).post(createUser);

router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);
export default router;
