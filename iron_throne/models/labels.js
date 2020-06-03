const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let labelSchema = new Schema({
	label_id: {
		type: String,
		required: true
	},
	user_id: { type: String },
	label_value: { type: String },
	label_creation_date: { type: Date }
});

module.exports = mongoose.model("Label", labelSchema);
