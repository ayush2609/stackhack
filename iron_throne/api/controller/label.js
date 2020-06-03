const labelServices = require("../services/label");
const { logger } = require("../../utils/logger");
const { handleErr } = require("../../utils/common");
const { v4: uuidv4 } = require("uuid");

//controller for getting all labels
exports.getLabels = function(req, res) {
	let params = req.params;
	let errors = [],
		isError = false;
	const { url } = req;
	return new Promise((resolve, reject) => {
		if (isError) {
			return reject(errors);
		}
		return resolve(true);
	})
		.then(resolved => {
			return labelServices.getLabels(params, req.user);
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

exports.createLabel = function(req, res) {
	let body = req.body;
	let errors = [],
		isError = false;
	const { url } = req;

	return new Promise((resolve, reject) => {
		if (!body.label_value) {
			isError = true;
			handleErr("missing", "labelValueMissing", errors);
		}
		if (isError) {
			return reject(errors);
		}
		return resolve(true);
	})
		.then(resolved => {
			body.label_id = uuidv4();
			body.label_creation_date = new Date();
			body.user_id = req.user.user_id
			return labelServices.createLabel(body);
		})
		.then(data=> {
			return labelServices.getLabels(data, req.user)
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
