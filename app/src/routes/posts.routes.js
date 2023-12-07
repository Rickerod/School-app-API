import { Router } from "express";
import { getPosts, getPostsProfile, addPost } from "../controllers/posts.controller.js";

const router = Router();

router.get("/:idUser", getPosts)
router.get("/:idUserProfile/:idUser", getPostsProfile)
router.post("/:idUser", addPost)
//router.delete("/:idUser", )


export default router;