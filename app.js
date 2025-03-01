const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/indexRouter");

app.get("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
