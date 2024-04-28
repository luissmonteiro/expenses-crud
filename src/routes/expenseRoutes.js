const express = require('express');
const expenseController = require('../controllers/expenseController');
const {isSignedIn}=require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new expense
 *     description: Endpoint to create a new expense.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/../models/Expense'
 *     responses:
 *       '201':
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/../models/Expense'
 *       '401':
 *         description: Unauthorized, invalid token
 *       '500':
 *         description: Internal server error
 */
router.post('/create', isSignedIn, expenseController.createExpense);

/**
 * @swagger
 * /api/list:
 *   get:
 *     summary: Get a list of expenses
 *     description: Endpoint to get a list of all expenses.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       '401':
 *         description: Unauthorized, invalid token
 *       '500':
 *         description: Internal server error
 */

router.get('/list', isSignedIn, expenseController.listExpenses);

/**
 * @swagger
 * /api/get/{id}:
 *   get:
 *     summary: Get a specific expense
 *     description: Endpoint to get a specific expense by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the expense to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the expense
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       '401':
 *         description: Unauthorized, invalid token
 *       '404':
 *         description: Expense not found
 *       '500':
 *         description: Internal server error
 */
router.get('/get/:id', isSignedIn, expenseController.getEspecificExpense);

/**
 * @swagger
 * /api/update/{id}:
 *   put:
 *     summary: Update an expense
 *     description: Endpoint to update an expense by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the expense to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       '200':
 *         description: Expense updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       '401':
 *         description: Unauthorized, invalid token
 *       '404':
 *         description: Expense not found
 *       '500':
 *         description: Internal server error
 */

router.put('/update/:id', isSignedIn, expenseController.updateExpense);

/**
 * @swagger
 * /api/delete/{id}:
 *   delete:
 *     summary: Delete an expense
 *     description: Endpoint to delete an expense by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the expense to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Expense deleted successfully
 *       '401':
 *         description: Unauthorized, invalid token
 *       '404':
 *         description: Expense not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/delete/:id', isSignedIn, expenseController.deleteExpense);

module.exports = router;