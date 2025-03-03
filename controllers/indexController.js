import passport from "../authentication/passportLocal.js";

const indexGet = (req, res) => {
  res.render("index");
};

const indexPost = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/",
  failureFlash: true,
});

export { indexGet, indexPost };
