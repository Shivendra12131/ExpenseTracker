const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({

    name: {
		type: String,
		required: true,
		trim: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	
	splitType: {
		type: String,
		enum: ["equal", "exact", "percentage"],
		required: true,
	},
	// Split details with how much each participant owes
	splitDetails: [
		{
			participantName: {
				type: String,
				required: true,
			},
			amountOwed: {
				type: Number,
				required: true,
			},
		},
	],
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
