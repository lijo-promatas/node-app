const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const posterRequestSchema = new Schema(
	{
		poster: {
			type: String,
			required: true,
			ref: "Poster"
		},
		from: {
			type: String,
			ref: "User"
		},
		message: {
			type: String
		},
		status: {
			type: String,
			enum: ["pending", "approved", "rejected"],
			default: "pending"
		}
	},
	{ timestamps: true }
);

const PosterRequest = mongoose.model("PosterRequest", posterRequestSchema);

module.exports = PosterRequest;
