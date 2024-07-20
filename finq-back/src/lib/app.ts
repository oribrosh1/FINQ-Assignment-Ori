import * as express from "express";
import { logger } from "./logger";
import { apiRouter } from "../api/routes/api.route";
import * as bodyParser from "body-parser";
import helmet from 'helmet';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
  logger.info(`Received request: ${req.method} ${req.url}`);
  next();
});

app.get("/health", (req, res) => {
  res.send({ message: "OK" });
});

app.use("/api", apiRouter);
export { app, apiRouter };
