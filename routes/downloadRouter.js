import { Router } from "express";
import downloadGet from "../controllers/downloadController.js";

const downloadRouter = Router();

downloadRouter.get("/", downloadGet);

export default downloadRouter;
