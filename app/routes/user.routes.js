module.exports = (app) => {
  const users = require("../controller/user.controller");

  let router = require("express").Router();
  app.use("/api/users", router);

  router.post("/register", users.create);
  router.post("/login", users.login);
};
