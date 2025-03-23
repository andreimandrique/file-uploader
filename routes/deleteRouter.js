import { Router } from "express";
import deletePost from "../controllers/deleteController.js";

const deleteRouter = Router();

deleteRouter.post("/:fileId", deletePost);

export default deleteRouter;
