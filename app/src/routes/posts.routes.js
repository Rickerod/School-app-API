import { Router } from "express";
import { getPosts, getPostsProfile, addPost, removePost, getPostPage, getPostsVideosProfile } from "../controllers/posts.controller.js";

const router = Router();

router.get("/:idUser/:idSchool", getPosts)
router.get("/profile/:typePost/:idUserProfile/:idUser", getPostsProfile)
router.get("/:idUser/:lastId/:firstId/:idSchool", getPostPage)
//router.get("/vide/:idUserProfile/:idUser", getPostsVideosProfile)
router.post("/:idUser", addPost)
router.delete("/:idPost", removePost)


export default router;