const Expense = require("../models/expense");
const sendEmail = require("../utils/emailUtils");
const findUser = require("../utils/databaseUtils");
const { formatDate, notValidDescription } = require("../utils/expenseUtils");
require("dotenv/config");

const createExpense = async (req, res) => {
  try {
    const { description, value, date } = req.body;

    const user = await findUser(req.auth.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedDate = formatDate(date);
    const currentDate = new Date();

    if (formattedDate == "Invalid Date" || formattedDate > currentDate) {
      return res.status(400).json({ message: "Invalid date" });
    }

    if (value <= 0 || typeof value !== "number") {
      return res.status(400).json({ message: "Invalid value" });
    }

    if (notValidDescription(description)) {
      return res.status(400).json({
        message: "Description must have the maximum of 191 chacacters",
      });
    }

    const userId = req.auth.userId;
    const expense = await Expense.create({
      description,
      value,
      user: userId,
      formattedDate,
    });

    await sendEmail(user.email, expense);
    return res.status(201).json(expense);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const listExpenses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await findUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const expenses = await Expense.find({ user: userId, deleted: false });
    return res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEspecificExpense = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await findUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { id } = req.params;
    const expense = await Expense.findOne({
      _id: id,
      user: userId,
      deleted: false,
    });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await findUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { id } = req.params;
    const { description, value, date } = req.body;
    const formattedDate = formatDate(date);
    const currentDate = new Date();

    if (formattedDate == "Invalid Date" || formattedDate > currentDate) {
      return res.status(400).json({ message: "Invalid date" });
    }

    if (value <= 0 || typeof value !== "number") {
      return res.status(400).json({ message: "Invalid value" });
    }

    if (notValidDescription(description)) {
      return res.status(400).json({
        message: "Description must have the maximum of 191 chacacters",
      });
    }

    const expense = await Expense.findOne({
      _id: id,
      user: userId,
      deleted: false,
    });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, user: userId },
      { description: description, value: value, date: formattedDate },
      { new: true },
    );
    await sendEmail(user.email, updatedExpense);
    return res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.auth.userId;
    const user = await findUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const expense = await Expense.findOneAndUpdate(
      { _id: expenseId, user: userId },
      { deleted: true },
      { new: true },
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({ message: "Expense deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExpense,
  listExpenses,
  getEspecificExpense,
  updateExpense,
  deleteExpense,
};
