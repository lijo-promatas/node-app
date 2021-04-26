const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const talentRequestSchema = new Schema(
	{
		talent: [
			{
				type: String,
				required: true,
				ref: "talent"
			}
		],
		from: {
			type: String,
			ref: "User"
		},
		to: {
			type: String,
			ref: "User"
		},
		status: {
			type: String,
			enum: ["pending", "approved", "rejected"],
			default: "pending"
		}
	},
	{ timestamps: true }
);

const TalentRequest = mongoose.model("TalentRequest", talentRequestSchema);

module.exports = TalentRequest;
