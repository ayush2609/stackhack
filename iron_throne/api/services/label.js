const Label = require("../../models/labels");
const labels = require("../../config/labels");

exports.createLabel = body => {
	return Label(body).save();
};

exports.getLabels = (params,user) => {
	return Label.find({ user_id: user.user_id }).then(data => {
		return labels.labels.concat(data);
	});
};
