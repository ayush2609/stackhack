//configurable errors
const errors = {
	missing: {
		taskNameMissing: {
			code: "TASK_NAME_MISSING",
			msg: "Task Name Missing"
		},
		labelValueMissing: {
			code: "LABEL_VALUE_MISSING",
			msg: "Label Value Missing"
		},
		taskIdMissing: {
			code: "TASK_ID_MISSING",
			msg: "task ID Missing"
		},
		userIdMissing: {
			code: "USER_ID_MISSING",
			msg: "User ID Missing"
		},
		userEmailMissing: {
			code: "USER_EMAIL_MISSING",
			msg: "User Email Missing"
		},
		userPasswordMissing: {
			code: "USER_PASSWORD_MISSING",
			msg: "User Password Missing"
		}
	},
	duplicate: {
		userEmailDuplicate: {
			code: "USER_EMAIL_DUPLICATE",
			msg: "Email Already Registered"
		}
	},
	invalid: {
		invalidFilterKeys: {
			code: "FILTER_KEYS_ARE_INVALID",
			msg: "filter keys are invalid"
		},
		invaliduserEmail: {
			code: "USER_EMAIL_INVALID",
			msg: "User not Registered"
		},
		invaliduserPassword: {
			code: "USER_Password_INVALID",
			msg: "Wrong password"
		}
	}
};

module.exports = {
	errors
};
