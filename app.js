const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
// var AccessControl = require("express-ip-access-control");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const logger = require("./src/middlewares/logger");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middlewares/error");

// Load env vars
dotenv.config({ path: "./src/config/config.env" });

// Connect to DB
connectDB();

// Load route files here
const adminRoute = require("./src/routes/adminRoute");

const app = express();

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 10
});

app.use(limiter);
app.use(hpp());

// cors
app.use(cors());

// Body parser
app.use(express.json());

// Static folder
app.use(express.static("public"));

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(fileUpload());

// Mount routes here
app.use("/api/admin", adminRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;

const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);

// var options = {
// 	mode: "allow",
// 	denys: [],
// 	allows: ["127.0.0.1"],
// 	forceConnectionAddress: false,
// 	log: function (clientIp, access) {
// 		console.log(clientIp + (access ? " accessed." : " denied."));
// 	},

// 	statusCode: 401,
// 	redirectTo: "",
// 	message: "Unauthorized"
// };

// app.use(AccessControl(options));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`);

	// Close server and exit
	server.close(() => process.exit(1));
});
