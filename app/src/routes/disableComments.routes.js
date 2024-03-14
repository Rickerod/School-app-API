import { Router } from "express";
import { disableComments, getDisableComments } from "../controllers/disableComments.controller.js";

const router = Router();

router.get("/:idSchool", getDisableComments)
router.put("/:disabled/:idSchool", disableComments)

export default router;