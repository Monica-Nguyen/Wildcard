const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("matches", {});
});

module.exports = router;
