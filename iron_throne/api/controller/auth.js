const authServices = require("../services/auth");
const taskServices = require("../services/task");
const jwt = require("jsonwebtoken");
const { logger } = require("../../utils/logger");
const { handleErr } = require("../../utils/common");
const auth = require("../../config/auth");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

auth.autherization();

exports.authUser = (req, res) => {
	let body = req.body;
	let errors = [],
		isError = false;
	const { url } = req;
	let userDetail = {};
	let stats = {};
	let list = [];

	return new Promise((resolve, reject) => {
		if (!body.email) {
			isError = true;
			handleErr("missing", "userEmailMissing", errors);
		}
		if (!body.password) {
			isError = true;
			handleErr("missing", "userPasswordMissing", errors);
		}
		if (isError) {
			return reject(errors);
		}
		return resolve(true);
	})
		.then(resolved => {
			return authServices.authUser(body);
		})
		.then(result => {
			if (!result) {
				handleErr("invalid", "invaliduserEmail", errors);
				return Promise.reject(errors);
			} else return result;
		})
		.then(data => {
			userDetail = data;
			return bcrypt.compare(body.password, data.password);
		})
		.then(isMatch => {
			if (!isMatch) {
				handleErr("invalid", "invaliduserPassword", errors);
				return Promise.reject(errors);
			} else return true;
		})
		.then(data => {
			const token = jwt.sign(
				{
					email: userDetail.email,
					user_id: userDetail.user_id
				},
				process.env.SECRET,
				{ expiresIn: "24h" }
			);
			userDetail.token = token;
			userDetail.last_login = new Date();
			return authServices.updateUser(userDetail);
		})
		.then(data => {
			userDetail = data;
			return taskServices.getStats(userDetail.user_id);
		})
		.then(data => {
			stats = data;
			return taskServices.getList(userDetail.user_id);
		})
		.then(data => {
			list = data;
			logger.info({ url: url, data: data });
			res.status(200).json({
				data: [{ userDetail: userDetail }, { stats }, { tasks: list }]
			});
		})
		.catch(err => {
			logger.error(err);
			res.status(422).json({ Error: err });
		});
};

exports.registerUser = (req, res) => {
	let body = req.body;
	let errors = [],
		isError = false;
	const { url } = req;
	return new Promise((resolve, reject) => {
		if (!body.email) {
			isError = true;
			handleErr("missing", "userEmailMissing", errors);
		}
		if (!body.password) {
			isError = true;
			handleErr("missing", "userPasswordMissing", errors);
		}
		if (isError) {
			return reject(errors);
		}
		return resolve(true);
	})
		.then(resolved => {
			return authServices.authUser(body);
		})
		.then(data => {
			if (data) {
				handleErr("duplicate", "userEmailDuplicate", errors);
				return Promise.reject(errors);
			} else return true;
		})
		.then(async data => {
			body.user_id = uuidv4();
			const password = await bcrypt.hash(body.password, 12);
			body.password = password;
			return authServices.signUp(body);
		})
		.then(data => {
			logger.info({ url: url, data: data });
			res.status(200).json({ data });
		})
		.catch(err => {
			logger.error(err);
			res.status(422).json({ Error: err });
		});
};

exports.logout = (req, res) => {
	let body = req.body;
	let errors = [],
		isError = false;
	const { url } = req;
	let userDetail = {};

	return new Promise((resolve, reject) => {
		if (!body.email) {
			isError = true;
			handleErr("missing", "userEmailMissing", errors);
		}
		if (isError) {
			return reject(errors);
		}
		return resolve(true);
	})
		.then(resolved => {
			return authServices.authUser(body);
		})
		.then(result => {
			if (!result) {
				handleErr("invalid", "invaliduserEmail", errors);
				return Promise.reject(errors);
			} else return result;
		})
		.then(data => {
			userDetail = data;
			userDetail.token = null;
			userDetail.last_logout = new Date();
			return authServices.updateUser(userDetail);
		})
		.then(data => {
			logger.info({ url: url, data: data });
			res.status(200).json({ sucess: true });
		})
		.catch(err => {
			logger.error(err);
			res.status(422).json({ Error: err });
		});
};

exports.editUser = (req, res) => {
	let body = req.body;
	let errors = [],
		isError = false;
	const { url } = req;
	return new Promise((resolve, reject) => {
		if (isError) {
			return reject(errors);
		}
		return resolve(true);
	})
		.then(async resolved => {
			body.user_id = req.user.user_id;
			if (body.password) {
				const password = await bcrypt.hash(body.password, 12);
				body.password = password;
			}
			return authServices.updateUser(body);
		})
		.then(data => {
			logger.info({ url: url, data: data });
			res.status(200).json({ data });
		})
		.catch(err => {
			logger.error(err);
			res.status(422).json({ Error: err });
		});
};
