import { Router } from "express";
import { uploadImages } from "../controllers/images.controller.js";
const router = Router();

router.post("/", uploadImages)


export default router;