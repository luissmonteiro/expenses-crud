const Expense = require('../models/expense');
const nodemailer = require('nodemailer');
const User = require('../models/user');
require("dotenv/config");

sendEmail = async (userEmail, expenseDetails) => {
    const transporter = nodemailer.createTransport({
      port: process.env.transporterPort,
      host: process.env.trasporterHost,
      secure: false
    });

    const mailOptions = {
      from: process.env.hostEmail,
      to: userEmail,
      subject: 'Expense Created',
      text: `Expense Created: ${expenseDetails}`
  };
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch(error) {
      console.log('Error sending email', error);

    }
};

findUser = async (userId) => { 
  const user = await User.findOne({ _id: userId });
  return user;
}


const createExpense = async (req, res) => {
  try {
    const { description, value, date } = req.body;

    const user = await findUser(req.auth.userId);
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }

    const dateParts = date.split("/");
    const formattedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    const currentDate = new Date();

    if(formattedDate == 'Invalid Date' || formattedDate > currentDate){
      return res.status(400).json({ message: 'Invalid date' });
    }

    if(value <= 0 || typeof value !== 'number'){
      return res.status(400).json({ message: 'Invalid value' });
    }

    if( description.length > 191 || description.length < 1 || typeof description !== 'string'){
      return res.status(400).json({ message: 'Description must the maximum of 191 chacacters' });}

    const userId = req.auth.userId;
    const expense = await Expense.create({ description, value, user: userId, formattedDate });

    await sendEmail(user.email, expense);
    return res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listExpenses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await findUser(userId);
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    const expenses = await Expense.find({ user: userId , deleted: false});
    return res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEspecificExpense = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await findUser(userId);
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    const { id } = req.params;
    const expense = await Expense.findOne({ _id: id, user: userId, deleted: false});
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
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
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }

    const { id } = req.params;
    const { description, value, date } = req.body;
    const dateParts = date.split("/");
    const formattedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    const currentDate = new Date();

    if(formattedDate === 'Invalid Date' || formattedDate > currentDate){
      return res.status(400).json({ message: 'Invalid date' });
    }

    if(value <= 0 || typeof value !== 'number'){
      return res.status(400).json({ message: 'Invalid value' });
    }

    if( description.length > 191 || description.length < 1 || typeof description !== 'string'){
      return res.status(400).json({ message: 'Description must the maximum of 191 chacacters' });}

    const expense = await Expense.findOne({ _id: id, user: userId , deleted: false});
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.description = description;
    expense.value = value;
    expense.date = formattedDate;
    await expense.save();
    await sendEmail(user.email, expense);
    return res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.auth.userId;
    const user = await findUser(userId);
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    const expense = await Expense.findOneAndUpdate(
      { _id: expenseId, user: userId },
      { deleted: true },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExpense,
  listExpenses,
  getEspecificExpense,
  updateExpense,
  deleteExpense
};
