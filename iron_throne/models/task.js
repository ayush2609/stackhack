const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = new Schema({
	task_id: {
		type: String,
		required: true
	},
	user_id: { type: String },
	task_name: { type: String },
	task_description: { type: String },
	task_priority: { type: Number },
	task_status: { type: String },
	task_label_id: { type: String },
	task_label_value: { type: String },
	task_due_date: { type: Date },
	task_creation_date: { type: Date }
});

module.exports = mongoose.model("Task", taskSchema);
