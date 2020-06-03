const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userInfoSchema = new Schema({
	user_id: {
		type: String,
		required: true
	},
	name: { type: String },
	email: { type: String },
	password: { type: String },
	token: { type: String },
	last_login: { type: String },
	last_logout: { type: String }
});

module.exports = mongoose.model("UserInfo", userInfoSchema);
