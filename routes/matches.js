const express = require("express");
const connectEnsureLogin = require("connect-ensure-login");
const router = express.Router();

router.get("/", connectEnsureLogin.ensureLoggedIn(), function (req, res, next) {
  res.render("matches", {});
});

module.exports = router;
