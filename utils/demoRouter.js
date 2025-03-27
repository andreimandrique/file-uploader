import { Router } from "express";
import demoGet from "../controllers/demoController.js";

const demoRouter = Router();

demoRouter.get("/", demoGet);

export default demoRouter;
