const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const catchAsync = require("./catchAsync");

const User = require("../models/user");

exports.authenticate = catchAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return next(new ErrorResponse("Not authorized to access this", 401));
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await User.findById(decoded._id);

		next();
	} catch (error) {
		return next(new ErrorResponse("Not authorized to access this", 401));
	}
});

exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorResponse(
					`Your role ${req.user.role} is not authorized for this action`,
					403
				)
			);
		}
		next();
	};
};
