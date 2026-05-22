import { Router } from "express";
import { getEncuesta, guardarRespuestas } from "../controllers/controllers.js";

const router = Router();

router.get("/:token", getEncuesta);
router.post("/respuestas", guardarRespuestas);

export default router;
