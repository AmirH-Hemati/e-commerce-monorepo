import express from "express";
import { deleteImage, resizeImage, uploadImage } from "../controllers/uploadControllers.js";

const router = express.Router();

router.post("/", uploadImage, resizeImage);
router.delete("/", deleteImage);
export default router;
