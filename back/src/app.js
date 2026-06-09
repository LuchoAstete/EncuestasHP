import express from "express";
import cors from "cors";
import encuestasRoutes from "./routes/routes.js";
import encuestasAdminRoutes from "./routes/encuestasAdmin.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/encuestas", encuestasRoutes);

app.use("/api/admin/encuestas", encuestasAdminRoutes);

export default app;
