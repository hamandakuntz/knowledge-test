const { Router } = require("express");
const { readdirSync } = require("fs");

module.exports = (app) => {
  const router = Router();

  app.use("/api", router);
  readdirSync(`${__dirname}/../routes`).map(async (file) => {
    try {
      if (!file.endsWith(".map")) {
        await require(`../routes/${file}`)(router);
      }
    } catch (e) {
      console.log(e);
    }
  });
};
