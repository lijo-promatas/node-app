const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const talentSchema = new Schema(
	{
		category: {
			type: String,
			required: true,
			ref: "Category"
		},
		experience: {
			level: { type: String },
			years: { type: Number },
			projects: { type: Number }
		},
		referenceLinks: {
			type: String
		},
		notes: {
			type: String
		},
		user: {
			type: String,
			ref: "User"
		}
	},
	{ timestamps: true }
);

const Talent = mongoose.model("Talent", talentSchema);

module.exports = Talent;
