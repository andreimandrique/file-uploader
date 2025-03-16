import { Router } from "express";
import { dowloadGet } from "../controllers/downloadController.js";

const downloadRouter = Router();

downloadRouter.get("/", dowloadGet);

export default downloadRouter;
