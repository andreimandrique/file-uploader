import express from "express";

const app = express();
const port = 3000;

import session from "express-session";
import sessionConfig from "./config/sessionConfig.js";
import passport from "passport";
import flash from "express-flash";

app.use(session(sessionConfig));
app.use(passport.session());
app.use(flash());

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

import indexRouter from "./routes/indexRouter.js";
import logoutRouter from "./routes/logoutRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import addFileRouter from "./routes/addFileRouter.js";
import downloadRouter from "./routes/downloadRouter.js";

import showCurrentUser from "./middlewares/showCurrentUser.js";
import isLoggedIn from "./middlewares/isLoggedIn.js";

app.use("/", indexRouter);
app.use("/logout", logoutRouter);

app.use(showCurrentUser);

app.use("/dashboard", dashboardRouter);
app.use("/addFile", addFileRouter);
app.use("/download", downloadRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
