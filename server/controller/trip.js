const Trip = require("../models/Trip");
const User = require("../models/User");


exports.addNewTripController = async (req, res) => {
  try {
    const { tripName, tripDescription, participants } = req.body;

    if (!tripName || !participants || participants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Trip name and participants are required.",
      });
    }

    
    const newTrip = await Trip.create({
      tripName,
      tripDescription,
      participants, 
    });

   
    const user = await User.findById({ _id: req.user.id });
    user.trip.push(newTrip._id);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Trip created successfully.",
      trip: newTrip,
    });
  } catch (error) {
    console.error("Error creating trip:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create trip.",
      data : req.user,
    });
  }
};
