import { Router } from "express";
import { getReports, addReportUser} from "../controllers/reports.controller.js";

const router = Router();

router.get("/", getReports) //all reports post and general
//router.post("/:idUser/:idPost")
router.post("/:idUser", addReportUser)

export default router;