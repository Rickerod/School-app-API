import { Router } from "express";
import { getUsers, getUser, getNumPostsUser, updateProfileUser } from "../controllers/user.controller.js";
const router = Router();

router.get("/profile/:idUser", getUser)
router.get("/profile/numPosts/:idUser", getNumPostsUser)
router.get("/:idSchool", getUsers)
router.put("/:idUser", updateProfileUser)

export default router;