import express from "express";

const app = express();
const port = 3000;

import session from "express-session";
import sessionConfig from "./config/sessionConfig.js";
import passport from "passport";
import flash from "express-flash";
import { rateLimit } from "express-rate-limit";
import rateLimitingConfig from "./config/rateLimitingConfig.js";

app.use(session(sessionConfig));
app.use(passport.session(undefined));
app.use(flash());
app.use(rateLimit(rateLimitingConfig));

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
import signupRouter from "./routes/signupRouter.js";
import demoRouter from "./routes/demoRouter.js";
import logoutRouter from "./routes/logoutRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import addFileRouter from "./routes/addFileRouter.js";
import downloadRouter from "./routes/downloadRouter.js";
import deleteRouter from "./routes/deleteRouter.js";

import showCurrentUser from "./middlewares/showCurrentUser.js";
import isLoggedIn from "./middlewares/isLoggedIn.js";

app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.use("/log-out", logoutRouter);
app.use("/demo", demoRouter);

app.use(showCurrentUser);
app.use(isLoggedIn);

app.use("/dashboard", dashboardRouter);
app.use("/add-file", addFileRouter);
app.use("/download", downloadRouter);
app.use("/delete", deleteRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
