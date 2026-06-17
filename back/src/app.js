import express from "express";
import cors from "cors";
import encuestasRoutes from "./routes/encuestas.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", encuestasRoutes);

export default app;
