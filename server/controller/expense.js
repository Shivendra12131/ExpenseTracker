const Trip = require("../models/Trip");
const Expense = require("../models/Expense");

exports.addExpenseController = async (req, res) => {
  try {
    const { tripId, name, amount, splitType, splitDetails } = req.body;

    if (!tripId || !name || !amount || !splitType || !splitDetails) {
      return res.status(400).json({
        success: false,
        message: "All fields (tripId, name, amount, splitType, splitDetails) are required.",
      });
    }

    const newExpense = await Expense.create({
      name,
      amount,
      splitType,
      splitDetails,
    });

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    trip.expenses.push(newExpense._id);
    await trip.save();

    return res.status(200).json({
      success: true,
      message: "Expense added successfully to the trip.",
      expense: newExpense,
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add expense.",
    });
  }
};


exports.getUserExpensesController = async (req, res) => {
    try {
      const { userId } = req.params; 
      const trips = await Trip.find({ "participants.name": userId })
        .populate("expenses")
        .exec();
  
      if (!trips || trips.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No trips found for this user.",
        });
      }
  
      const userTotals = {};
  
      trips.forEach((trip) => {
        trip.expenses.forEach((expense) => {
          switch (expense.splitType) {
            case "equal":
              const equalAmount = expense.amount / expense.splitDetails.length; 
              expense.splitDetails.forEach((splitDetail) => {
                if (splitDetail.participantName === userId) {
                  if (!userTotals[userId]) {
                    userTotals[userId] = 0;
                  }
                  userTotals[userId] += equalAmount; 
                }
              });
              break;
  
            case "exact":
              expense.splitDetails.forEach((splitDetail) => {
                if (splitDetail.participantName === userId) {
                  if (!userTotals[userId]) {
                    userTotals[userId] = 0;
                  }
                  userTotals[userId] += splitDetail.amountOwed; 
                }
              });
              break;
  
            case "percentage":
              expense.splitDetails.forEach((splitDetail) => {
                if (splitDetail.participantName === userId) {
                  const percentageAmount = (expense.amount * splitDetail.amountOwed) / 100;
                  if (!userTotals[userId]) {
                    userTotals[userId] = 0;
                  }
                  userTotals[userId] += percentageAmount;
                }
              });
              break;
  
            default:
              break;
          }
        });
      });
  
      return res.status(200).json({
        success: true,
        message: "Total expenses retrieved successfully for the user.",
        expenses: userTotals, 
      });
    } catch (error) {
      console.error("Error retrieving user expenses:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve user expenses.",
      });
    }
  };
  
  
  

  exports.getAllExpensesController = async (req, res) => {
    try {
      const trips = await Trip.find()
        .populate("expenses") 
        .exec();
  
      if (!trips || trips.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No trips found.",
        });
      }
  
      const participantTotals = {};
  
      trips.forEach((trip) => {
        trip.expenses.forEach((expense) => {
          switch (expense.splitType) {
            case "equal":
              const equalAmount = expense.amount / expense.splitDetails.length; 
              expense.splitDetails.forEach((splitDetail) => {
                if (!participantTotals[splitDetail.participantName]) {
                  participantTotals[splitDetail.participantName] = 0;
                }
                participantTotals[splitDetail.participantName] += equalAmount;
              });
              break;
  
            case "exact":
              expense.splitDetails.forEach((splitDetail) => {
                if (!participantTotals[splitDetail.participantName]) {
                  participantTotals[splitDetail.participantName] = 0;
                }
                participantTotals[splitDetail.participantName] += splitDetail.amountOwed; 
              });
              break;
  
            case "percentage":
              expense.splitDetails.forEach((splitDetail) => {
                const percentageAmount = (expense.amount * splitDetail.amountOwed) / 100; 
                if (!participantTotals[splitDetail.participantName]) {
                  participantTotals[splitDetail.participantName] = 0;
                }
                participantTotals[splitDetail.participantName] += percentageAmount;
              });
              break;
  
            default:
              break;
          }
        });
      });
  
      return res.status(200).json({
        success: true,
        message: "All expenses retrieved successfully.",
        expenses: participantTotals, 
      });
    } catch (error) {
      console.error("Error retrieving all expenses:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve all expenses.",
      });
    }
  };
  