import { Router } from "express";
import {getBitacoras, getQuestions, getAnswers, insertAnswers, uploadBitacora, getBitacorasUser, getStatisticsBitacora} from "../controllers/bitacoras.controller.js"
const router = Router();

router.get("/", getBitacoras)
router.get("/users/:idUser/:idUserProfile", getBitacorasUser)
router.get("/questions", getQuestions)
router.get("/answers/:idBitacora", getAnswers)
router.post("/answers/:idUser/:idBitacora", insertAnswers)
router.post("/:idUser", uploadBitacora)
router.get("/statistics/:idBitacora/:idQuestion", getStatisticsBitacora)

export default router;