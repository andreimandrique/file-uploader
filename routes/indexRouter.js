import { Router } from "express";
import { indexGet, indexPost } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", indexGet);
indexRouter.post("/", indexPost);

export default indexRouter;
