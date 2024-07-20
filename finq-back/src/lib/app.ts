import express from "express";
import { json } from "body-parser";
import { logger } from "./logger";
import { apiRouter } from "../api/routes/api.route";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(json());

app.use(helmet());
app.use(cors());

// Logger middleware that logs the request method and URL
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.info(`Received request: ${req.method} ${req.url}`);
  next();
});

// Health check route
app.get("/health", (req: express.Request, res: express.Response) => {
  res.send({ message: "OK" });
});

// API router
app.use("/api", apiRouter);

export { app, apiRouter };
