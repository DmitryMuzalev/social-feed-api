import express from "express";
import { logger } from "./middleware/logger";
import healthRouter from "./routes/health.routes";

const app = express();

app.use(express.json());

app.use(logger);

app.use("/health", healthRouter);

export default app;
