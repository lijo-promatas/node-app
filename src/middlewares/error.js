const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	// Log to console
	console.log(err.stack.red);

	// Mongoose bad ObjectId error
	if (err.name === "CastError") {
		const message = `Resource not found with ID of ${err.value}`;
		error = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = `Duplicate field value entered`;
		error = new ErrorResponse(message, 400);
	}

	// Mongoose validator error
	if (err.name === "ValidationError") {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	let message = "";

	switch (err.statusCode) {
		case 400:
			message = "Invalid payload";
			break;
		case 404:
			message = "No results";
			break;
		case 500:
			message = "Something went wrong";
			break;
		default:
			"Something went wrong";
	}

	res.status(error.statusCode || 500).json({
		success: false,
		message: error.message,
		error: {
			code: error.statusCode || 500,
			message: message || "Something went wrong"
		}
	});
};

module.exports = errorHandler;
