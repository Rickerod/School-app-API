import { Router } from "express";
import { getSurvey, insertAnswerSurvey, insertSurvey, removeSurvey } from "../controllers/survey.controller.js";

const router = Router();

router.get("/:idUser/:idUserProfile", getSurvey)
router.post("/insertAlternative", insertAnswerSurvey)
router.post("/insertSurvey/:idUser", insertSurvey)
router.post("/removeSurvey", removeSurvey)

export default router;