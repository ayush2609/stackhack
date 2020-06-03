const express = require('express');
const router = express.Router();
const authController = require('../api/controller/auth');
const passport = require("passport");
require("dotenv").config();


router.post( '/login', authController.authUser )
router.post('/register', authController.registerUser)
router.post('/logout',
passport.authenticate(process.env.STRATEGY, {session: false}),
authController.logout)
router.put('/editUser',
passport.authenticate(process.env.STRATEGY, {session: false}),
authController.editUser)

module.exports = router;