import { Router } from "express";
import { getComments, addComment, getCommentsPage, removeComment} from "../controllers/comments.controller.js";
const router = Router();

router.get("/:idPost", getComments)
router.get("/:idPost/:idComment", getCommentsPage)
router.post("/:idPost/:idUser", addComment)
router.post("/removeComment", removeComment)

export default router;