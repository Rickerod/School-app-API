import { Router } from "express";
import { getPosts, getPostsProfile, addPost, removePost, getPostPage, getPostsVideosProfile } from "../controllers/posts.controller.js";

const router = Router();

router.get("/:idUser", getPosts)
router.get("/:idUser/:lastId/:firstId", getPostPage)
router.get("/profile/:typePost/:idUserProfile/:idUser", getPostsProfile)
//router.get("/vide/:idUserProfile/:idUser", getPostsVideosProfile)
router.post("/:idUser", addPost)
router.delete("/:idPost", removePost)


export default router;