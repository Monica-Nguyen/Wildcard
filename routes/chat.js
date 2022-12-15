const express = require("express");
const connectEnsureLogin = require("connect-ensure-login");
const router = express.Router();

router.get("/:id", connectEnsureLogin.ensureLoggedIn(), function (req, res, next) {
  res.render("chat", {});
});

module.exports = router;
