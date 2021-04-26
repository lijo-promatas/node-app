exports.hello = async (req, res, next) => {
	res.status(200).json({
		success: true,
		message: "Hello world"
	});
};
