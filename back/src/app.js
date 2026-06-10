import express from "express";
import cors from "cors";
import sucursalesRoutes from "./routes/encuestasAdmin.js";
import encuestasAdminRoutes from "./routes/encuestasAdmin.js";
import getEncuesta from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/encuestas", getEncuesta);

app.use("/api/sucursales", sucursalesRoutes);

app.use("/api/admin/encuestas", encuestasAdminRoutes);

export default app;
