import { Router } from "express";
import {getBitacoras, getQuestions, getAnswers, insertAnswers, uploadBitacora, getBitacorasUser} from "../controllers/bitacoras.controller.js"
const router = Router();

router.get("/", getBitacoras)
router.get("/:idUser", getBitacorasUser)
router.get("/questions/:idBitacora", getQuestions)
router.get("/answers/:idBitacora", getAnswers)
router.post("/answers/:idUser", insertAnswers)
router.post("/:idUser", uploadBitacora)

export default router;