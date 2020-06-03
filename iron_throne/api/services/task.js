const Task = require("../../models/task");

exports.createTask = body => {
	return Task(body).save();
};

exports.getTasks = (query, user) => {
	let where = {};
	if (query.status && query.status !== "all") {
		where.task_status = query.status;
	}
	if (query.label && query.label !== "all") {
		where.task_label_value = query.label;
	}
	if (query.startDate && query.startDate !== "all") {
		where.task_due_date = {
			$gte: new Date(query.startDate),
			$lt: new Date(query.endDate)
		};
	}
	where.user_id = user.user_id;
	return Task.find(where);
	// return Task.count(where);
};

exports.deleteTask = body => {
	return Task.deleteOne({ task_id: body.task_id, user_id: body.user_id }).then(
		data => {
			if (data && data.deletedCount == 0) {
				return Promise.reject({ notDeleted: true });
			}
			return { sucess: true };
		}
	);
};

exports.editTask = body => {
	return Task.findOneAndUpdate(
		{ task_id: body.task_id, user_id: body.user_id },
		{ $set: body },
		{ new: true }
	).then(data => {
		return data;
	});
};

exports.getNames = (query, user) => {
	let where = {};
	where.user_id = user.user_id;
	where.task_name = { $regex: new RegExp(query.name, "i") };
	return Task.find(where, "task_name")
		.sort({ task_creation_date: -1 })
		.limit(5);
};

exports.getStats = user_id => {
	return Task.aggregate([
		{ $match: { user_id: user_id } },
		{
			$group: {
				_id: "$task_status",
				count: { $sum: 1 }
			}
		},
		{
			$project: {
				status: "$_id",
				count: "$count",
				_id: false
			}
		}
	]).then(data => {
		let obj = data.find(o => o.status === "completed");
		if (!obj) {
			data.push({ status: "completed", count: 0 });
		}
		obj = data.find(o => o.status === "pending");
		if (!obj) {
			data.push({ status: "pending", count: 0 });
		}
		obj = data.find(o => o.status === "inprogress");
		if (!obj) {
			data.push({ status: "inprogress", count: 0 });
		}
		function dynamicSort(property) {
			let sortOrder = 1;
			if(property[0] === "-") {
				sortOrder = -1;
				property = property.substr(1);
			}
			return function (a,b) {
				if(sortOrder == -1){
					return b[property].localeCompare(a[property]);
				}else{
					return a[property].localeCompare(b[property]);
				}        
			}
		}
		return data.sort(dynamicSort("status"));
	});
};

exports.getList = user_id => {
	let where = {};
	let overdue = {};
	let urgent = {};
	where.user_id = user_id;
	where.task_priority = {
		$gte: 3
	};
	let start = new Date();
	start.setHours(0, 0, 0, 0);
	where.task_due_date = {
		$lt: start
	};
	where.task_status = {
		$ne: "completed"
	};
	return Task.find(where, "task_name task_priority")
		.sort({ task_due_date: -1 })
		.limit(6)
		.then(data => {
			overdue = data;
			let start = new Date();
			let tomorrow = new Date();
			start.setHours(0, 0, 0, 0);
			tomorrow.setHours(0, 0, 0, 0);
			tomorrow.setDate(tomorrow.getDate() + 1);
			where.task_due_date = {
				$gte: start,
				$lt: tomorrow
			};
			return Task.find(where, "task_name task_priority")
				.sort({ task_due_date: -1 })
				.limit(6)
				.then(data => {
					urgent = data;
					return [{ overdue: overdue }, { urgent: urgent }];
				});
		});
};
