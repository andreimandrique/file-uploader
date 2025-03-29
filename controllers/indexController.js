import passport from "../config/passportLocal.js";

const indexGet = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  }
  res.render("index");
};

const indexPost = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/",
  failureFlash: true,
});

export { indexGet, indexPost };
