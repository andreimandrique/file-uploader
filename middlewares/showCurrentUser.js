const showCurrentUser = (req, res, next) => {
  res.locals.currentUser = req.user;
  next();
};
// <%= currentUser.username %>
export default showCurrentUser;
