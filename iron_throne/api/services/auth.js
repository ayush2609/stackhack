const UserInfo = require("../../models/userInfo");

exports.authUser = body => {
	return UserInfo.findOne({ email: body.email });
};

exports.signUp = body => {
	return UserInfo(body).save();
};

exports.updateUser = userDetail => {
	return UserInfo.findOneAndUpdate(
		{ user_id: userDetail.user_id },
		{ $set: userDetail },
		{ new: true }
	).then(data => {
		return data;
	});
};
