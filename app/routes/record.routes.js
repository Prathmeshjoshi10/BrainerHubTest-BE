module.exports = (app) => {
  const records = require("../controller/record.controller");

  let router = require("express").Router();
  app.use("/api/records", router);

  router.post("/create", records.create);
  router.delete("/delete/:id", records.delete);
  router.patch("/edit/:id", records.edit);
  //   router.get("/getAll/:userId", records.getAll);
  router.get("/getAll", records.getAll);
};
