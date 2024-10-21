const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
	mongoose
		.connect(MONGODB_URL)
		.then(console.log(`Db connection established`))
		.catch((err) => {
			console.log(`Db connection error: ${err}`);
			console.log(err);
			process.exit(1);
		});
};
