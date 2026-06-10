import { Router } from "express";

import {
    listarSucursales,
    //listarEncuestasVigentes,
    obtenerSucursalPorToken,
    listarEncuestasSucursal
}
from "../controllers/encuestasAdmin.js";

const router = Router();

router.get("/", listarSucursales);

router.get("/sucursal/:cdSucursal", listarEncuestasSucursal);



router.get(
    "/token/:token",
    obtenerSucursalPorToken
);

export default router;