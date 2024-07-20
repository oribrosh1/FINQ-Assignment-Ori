import { Router } from "express";
import { usersRouter } from "./users.route";

const apiRouter = Router();
apiRouter.use(usersRouter);

export { apiRouter };
