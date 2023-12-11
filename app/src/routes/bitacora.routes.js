import { Router } from "express";
import {getBitacoras, getQuestions, getAnswers, insertAnswers} from "../controllers/bitacoras.controller.js"
const router = Router();

router.get("/", getBitacoras)
router.get("/questions/:idBitacora", getQuestions)
router.get("/answers/:idBitacora", getAnswers)
router.post("/answers/:idUser", insertAnswers)
router.post("/")

export default router;