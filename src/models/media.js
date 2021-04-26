const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	file: {
		type: String
	},
	type: {
		type: String,
		enum: ["image", "video"]
	},
	catgeory: {
		type: String,
		ref: "Category"
	},
	owner: {
		type: String,
		ref: "User"
	},
	status: {
		type: Boolean,
		enum: ["pending", "approved", "rejected"],
		default: "pending"
	}
});

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
