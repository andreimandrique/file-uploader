import { Router } from "express";
import dashboardGet from "../controllers/dashboardController.js";

const dashboardRouter = Router();

dashboardRouter.get("/", dashboardGet);

export default dashboardRouter;
