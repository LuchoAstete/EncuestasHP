import { Router } from "express";

import {
    listarSucursales,
    listarEncuestasSucursal,
    getEncuesta,
    guardarRespuestas
}
from "../controllers/encuestas.controllers.js";

const router = Router();

// Lista de sucursales (pantalla manual)
router.get("/sucursales", listarSucursales);

// Encuestas vigentes de una sucursal seleccionada manualmente
router.get("/sucursales/:cdSucursal/encuestas", listarEncuestasSucursal);

// Obtener una encuesta específica
router.get("/encuestas/:cdEncuestaSucursal", getEncuesta);

// Guardar respuestas
router.post("/respuestas", guardarRespuestas);

export default router;