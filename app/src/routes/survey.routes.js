import { Router } from "express";
import { getSurvey } from "../controllers/survey.controller.js";

const router = Router();

router.get("/:idUser", getSurvey)

export default router;