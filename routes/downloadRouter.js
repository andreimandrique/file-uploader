import { Router } from "express";
import downloadPost from "../controllers/downloadController.js";

const downloadRouter = Router();

downloadRouter.post("/:fileId", downloadPost);

export default downloadRouter;
