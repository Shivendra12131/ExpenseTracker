const express = require('express');
const { auth } = require('../middleware/auth');
const { addNewTripController } = require('../controller/trip');
const { addExpenseController, getUserExpensesController, getAllExpensesController} = require('../controller/expense');
const {signup,login} = require('../controller/Auth')

const router = express.Router();

router.post("/login",login);
router.post("/signup",signup);

router.post("/trip", auth, addNewTripController);

router.post("/addExpenses", auth, addExpenseController);
router.get("/getExpenses/:userId", auth, getUserExpensesController);
router.get("/getAllExpenses", auth, getAllExpensesController);

module.exports = { allRoutes: router };