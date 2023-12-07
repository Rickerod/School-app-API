import { Router } from "express";
import { getUsers, getUser, getNumPostsUser } from "../controllers/user.controller.js";
const router = Router();

router.get("/profile/:idUser", getUser)
router.get("/profile/numPosts/:idUser", getNumPostsUser)
router.get("/:idSchool", getUsers)

export default router;