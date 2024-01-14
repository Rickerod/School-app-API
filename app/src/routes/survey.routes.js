import { Router } from "express";
import { getSurvey, insertAnswerSurvey, insertSurvey } from "../controllers/survey.controller.js";

const router = Router();

router.get("/:idUser/:idUserProfile", getSurvey)
router.post("/insertAlternative", insertAnswerSurvey)
router.post("/insertSurvey/:idUser", insertSurvey)

export default router;