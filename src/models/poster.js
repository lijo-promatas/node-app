const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const posterSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"]
		},
		description: {
			type: String,
			required: [true, "Description is required"]
		},
		image: {
			type: String
		},
		slug: {
			type: String
		},
		startDate: {
			type: Date,
			required: [true, "Start date is required"]
		},
		endDate: {
			type: Date,
			required: [true, "End date is required"]
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Owner is required"]
		},
		status: {
			type: String,
			enum: ["pending", "approved", "rejected", "expired"],
			default: "pending"
		},
		ageLimit: {
			type: String
		},
		location: {
			type: String
		},
		categories: [
			{
				type: String,
				ref: "Category"
			}
		]
	},
	{ timestamps: true }
);

posterSchema.pre("save", function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

const Poster = mongoose.model("Poster", posterSchema);

module.exports = Poster;
