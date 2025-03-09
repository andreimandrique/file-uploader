import { Router } from "express";
import { addFileGet, addFilePost } from "../controllers/addFileController.js";

const addFileRouter = Router();

addFileRouter.get("/", addFileGet);
addFileRouter.post("/", addFilePost);

export default addFileRouter;
