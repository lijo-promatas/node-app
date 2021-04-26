const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const schema = mongoose.Schema;

const userSchema = new schema(
	{
		name: {
			firstName: {
				type: String,
				required: [true, "First name is required"]
			},
			lastName: {
				type: String
			}
		},
		email: {
			type: String,
			required: [true, "Email is required"]
		},
		phone: {
			type: String,
			required: [true, "Phone is required"]
		},
		dob: {
			type: Date,
			required: [true, "DOB is required"]
		},
		gender: {
			type: String,
			required: [true, "Gender is required"],
			enum: ["male", "frmale", "other"]
		},
		location: {
			city: {
				type: String
			},
			state: {
				type: String
			},
			country: {
				type: String
			}
		},
		highestEducation: {
			type: String
		},
		languages: [
			{
				type: String
			}
		],
		role: {
			type: String,
			enum: ["super-admin", "admin", "user"]
		},
		image: {
			type: String
		},
		password: {
			type: String,
			required: [true, "Password is required"]
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user"
		},
		tokens: [
			{
				token: { type: String }
			}
		],
		resetPasswordToken: {
			type: String
		},
		resetPasswordExpire: {
			type: String
		},
		status: {
			type: String,
			enum: ["pending", "active", "inactive", "blocked"],
			default: "pending"
		}
	},
	{ timestamps: true }
);

//Encrypt password
userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 10);
	}
	next();
});

// Compare passsword
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Generate authentication token
userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign(
		{ _id: user._id.toString(), role: "user" },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRE }
	);
	return token;
};

// Generate reset pssword token
userSchema.methods.getPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");

	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
