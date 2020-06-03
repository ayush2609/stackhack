const passport = require("passport");
const passportJWT = require("passport-jwt");
let JwtStrategy = passportJWT.Strategy;
let ExtractJwt = passportJWT.ExtractJwt;
const User = require("../models/userInfo");
require("dotenv").config();

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET,
	passReqToCallback: true
};

exports.autherization = () => {
	passport.use(
		new JwtStrategy(opts, function(req, jwt_payload, done) {
			User.findOne({
				user_id: jwt_payload.user_id,
				token: req.headers.authorization.split(" ")[1]
			})
				.then(user => {
					if (user) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				})
				.catch(err => {
					return err;
				});
		})
	);
};
