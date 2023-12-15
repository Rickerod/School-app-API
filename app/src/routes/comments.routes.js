import { Router } from "express";
import { getComments, addComment, getCommentsPage} from "../controllers/comments.controller.js";
const router = Router();

router.get("/:idPost", getComments)
router.get("/:idPost/:idComment", getCommentsPage)
router.post("/:idPost/:idUser", addComment)

export default router;