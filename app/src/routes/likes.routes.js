import { Router } from "express";
import { insertLike } from "../controllers/likes.controller.js"
const router = Router();

router.post("/:idPost/:idUser", insertLike)


export default router;