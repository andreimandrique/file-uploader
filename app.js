import express from "express";

const app = express();
const port = 3000;

import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import flash from "express-flash";

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
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

import showCurrentUser from "./middlewares/showCurrentUser.js";
import isLoggedIn from "./middlewares/isLoggedIn.js";

app.use("/", indexRouter);
app.use("/logout", logoutRouter);

app.use(showCurrentUser);

app.use("/dashboard", isLoggedIn, dashboardRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
