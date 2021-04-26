const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true
		},
		slug: {
			type: String
		}
	},
	{ timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
