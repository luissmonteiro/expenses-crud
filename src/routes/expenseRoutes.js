const express = require('express');
const expenseController = require('../controllers/expenseController');
const {isSignedIn}=require('../controllers/authController');

const router = express.Router();

router.post('/create', isSignedIn, expenseController.createExpense);
router.get('/list', isSignedIn, expenseController.listExpenses);
router.get('/get/:id', isSignedIn, expenseController.getEspecificExpense);
router.put('/update/:id', isSignedIn, expenseController.updateExpense);
router.delete('/delete/:id', isSignedIn, expenseController.deleteExpense);

module.exports = router;
