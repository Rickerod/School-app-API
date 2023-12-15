import { Router } from "express";
import { uploadImages, uploadVideo } from "../controllers/images.controller.js";
const router = Router();

router.post("/images", uploadImages)
router.put("/video", uploadVideo)


export default router;