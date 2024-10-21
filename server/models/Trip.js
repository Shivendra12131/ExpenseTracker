const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
	tripName: {
		type: String,
		required: true,
		trim: true,
	},
	tripDescription: {
		type: String,
		trim: true,
	},
	// List of participants' names (users or external participants)
	participants: [
		{
			name: {
				type: String,
				required: true,
				trim: true,
			},
		},
	],
	// List of expenses associated with this trip
	expenses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Expense",
		},
	],
}, { timestamps: true });

module.exports = mongoose.model("Trip", tripSchema);
