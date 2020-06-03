const express = require("express");
const router = express.Router();
const labelController = require("../api/controller/label");
const passport = require("passport");
require("dotenv").config();

router.get(
	"/getLabels",
	passport.authenticate(process.env.STRATEGY, { session: false }),
	labelController.getLabels
);
router.post(
	"/create/",
	passport.authenticate(process.env.STRATEGY, { session: false }),
	labelController.createLabel
);

module.exports = router;
