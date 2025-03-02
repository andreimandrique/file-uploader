import express from "express";
import path from "path";

const app = express();
const port = 3000;

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

import indexRouter from "./routes/indexRouter.js";

app.get("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
