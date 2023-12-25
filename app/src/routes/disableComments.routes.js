import { Router } from "express";
import { disableComments, getDisableComments } from "../controllers/disableComments.controller.js";

const router = Router();

router.get("", getDisableComments)
router.put("/:disabled", disableComments)

export default router;