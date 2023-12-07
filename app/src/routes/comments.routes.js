import { Router } from "express";
import { getComments, addComment } from "../controllers/comments.controller.js";
const router = Router();

router.get("/:idPost", getComments)
router.post("/:idPost/:idUser", addComment)

export default router;