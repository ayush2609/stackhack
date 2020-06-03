const taskServices = require("../services/task");
const { logger } = require("../../utils/logger");
const { handleErr } = require("../../utils/common");
const { v4: uuidv4 } = require("uuid");

//cntroller for creating a new task
exports.createTask = (req, res) => {
	let body = req.body;
	let errors = [],
		isError = false;
	const { url } = req;
	let taskDetail = {};
	let stats = {};
	let list = [];

	return new Promise((resolve, reject) => {
		if (!body.task_name) {
			isError = true;
			handleErr("missing", "taskNameMissing", errors);
		}
		if (isError) {
			return reject(errors);
		}
		return resolve(true);
	})
		.then(resolved => {
			body.task_id = uuidv4();
			body.task_creation_date = new Date();
			body.user_id = req.user.user_id;
			return taskServices.createTask(body);
		})
		.then(data => {
			taskDetail = data;
			return taskServices.getStats(taskDetail.user_id);
		})
		.then(data => {
			stats = data;
			return taskServices.getList(taskDetail.user_id);
		})
		.then(data => {
			list = data;
			logger.info({ url: url, data: data });
			res.status(200).json({
				data: [{ taskDetail: taskDetail }, { stats }, { tasks: list }]
			});
		})
		.catch(err => {
			logger.error(err);
			res.status(422).json({ Error: err });
		});
};

areKeysValid = (actualObj, validSearchKeys) => {
	let isValid = true;
	Object.keys(actualObj).map((key, i) => {
		if (validSearchKeys.indexOf(key) < 0) {
			isValid = false;
		}
	});
	return isValid;
};

exports.getTasks = (req, res) => {
	let params = req.params;
	let query = req.query;
	let validSearchKeys = ["label", "status", "startDate", "endDate"];
	let isError = false,
		errors = [];
	let result = [];
	const { url } = req;
	return new Promise((resolve, reject) => {
		if (!areKeysValid(query, validSearchKeys)) {
			isError = true;
			handleErr("invalid", "invalidFilterKeys", errors);
		}
		if (isError) {
			return reject(errors);
		}
		return resolve(true);
	})
		.then(resolved => {
			return taskServices.getTasks(query, req.user);
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

exports.editTask = (req, res) => {
	let body = req.body;
	let errors = [],
		isError = false;
	const { url } = req;
	let taskDetail = {};
	let stats = {};
	let list = [];

	return new Promise((resolve, reject) => {
		if (!body.task_id) {
			isError = true;
			handleErr("missing", "taskIdMissing", errors);
		}
		if (isError) {
			return reject(errors);
		}
		return resolve(true);
	})
		.then(resolved => {
			body.user_id = req.user.user_id;
			return taskServices.editTask(body);
		})
		.then(data => {
			taskDetail = data;
			return taskServices.getStats(taskDetail.user_id);
		})
		.then(data => {
			stats = data;
			return taskServices.getList(taskDetail.user_id);
		})
		.then(data => {
			list = data;
			logger.info({ url: url, data: data });
			res.status(200).json({
				data: [{ taskDetail: taskDetail }, { stats }, { tasks: list }]
			});
		})
		.catch(err => {
			logger.error(err);
			res.status(422).json({ Error: err });
		});
};

exports.deleteTask = (req, res) => {
	let body = req.body;
	let errors = [],
		isError = false;
	const { url } = req;
	let taskDetail = {};
	let stats = {};
	let list = [];

	return new Promise((resolve, reject) => {
		if (!body.task_id) {
			isError = true;
			handleErr("missing", "taskIdMissing", errors);
		}
		if (isError) {
			return reject(errors);
		}
		return resolve(true);
	})
		.then(resolved => {
			body.user_id = req.user.user_id;
			return taskServices.deleteTask(body);
		})
		.then(data => {
			taskDetail = data;
			return taskServices.getStats(req.user.user_id);
		})
		.then(data => {
			stats = data;
			return taskServices.getList(req.user.user_id);
		})
		.then(data => {
			list = data;
			logger.info({ url: url, data: data });
			res.status(200).json({
				data: [{ taskDetail: taskDetail }, { stats }, { tasks: list }]
			});
		})
		.catch(err => {
			logger.error(err);
			res.status(422).json({ Error: err });
		});
};

exports.getNames = (req, res) => {
	let params = req.params;
	let query = req.query;
	let isError = false,
		errors = [];
	let result = [];
	const { url } = req;
	return new Promise((resolve, reject) => {
		if (isError) {
			return reject(errors);
		}
		return resolve(true);
	})
		.then(resolved => {
			return taskServices.getNames(query, req.user);
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
