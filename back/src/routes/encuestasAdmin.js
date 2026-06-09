import { Router } from "express";
import {
    listarEncuestas,
    crearEncuesta,
    actualizarEncuesta,
    listarCatalogos
} from "../controllers/encuestasAdmin.js";

const router = Router();

router.get("/", listarEncuestas);

router.get("/catalogos", listarCatalogos);

router.post("/", crearEncuesta);

router.put("/:id", actualizarEncuesta);

export default router;