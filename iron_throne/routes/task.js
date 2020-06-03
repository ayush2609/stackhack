const express = require("express");
const router = express.Router();
const taskController = require("../api/controller/task");
const passport = require("passport");
require("dotenv").config();

router.post(
	"/create",
	passport.authenticate(process.env.STRATEGY, { session: false }),
	taskController.createTask
);
router.get(
	"/get-tasks",
	passport.authenticate(process.env.STRATEGY, { session: false }),
	taskController.getTasks
);
router.put(
	"/edit",
	passport.authenticate(process.env.STRATEGY, { session: false }),
	taskController.editTask
);
router.delete(
	"/delete",
	passport.authenticate(process.env.STRATEGY, { session: false }),
	taskController.deleteTask
);
router.get(
	"/get-names",
	passport.authenticate(process.env.STRATEGY, { session: false }),
	taskController.getNames
);

module.exports = router;
