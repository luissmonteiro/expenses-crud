const express = require("express");
const expenseController = require("../controllers/expenseController");
const { isSignedIn } = require("../controllers/authController");

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
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               value:
 *                 type: number
 *               date:
 *                  type: string
 *                  format: DD/MM/YYYY
 *                  example: 01/01/2021
 *             required:
 *               - description
 *               - value
 *               - date
 *     responses:
 *       '201':
 *         description: New expense created
 *       '400':
 *         description: Bad request, invalid input
 *       '404':
 *         description: User not found or Invalid date
 *       '500':
 *         description: Internal server error
 */
router.post("/create", isSignedIn, expenseController.createExpense);

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
 *                  [ ]
 *       '401':
 *         description: Unauthorized, invalid token
 *       '500':
 *         description: Internal server error
 */
router.get("/list", isSignedIn, expenseController.listExpenses);
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
 *       '401':
 *         description: Unauthorized, invalid token
 *       '404':
 *         description: expense not found
 *       '500':
 *         description: Internal server error
 */
router.get("/get/:id", isSignedIn, expenseController.getEspecificExpense);
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
 *     responses:
 *       '200':
 *         description: expense updated successfully
 *         content:
 *           application/json:
 *             schema:
 *       '401':
 *         description: Unauthorized, invalid token
 *       '404':
 *         description: expense not found
 *       '500':
 *         description: Internal server error
 */
router.put("/update/:id", isSignedIn, expenseController.updateExpense);
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
 *         description: expense deleted successfully
 *       '401':
 *         description: Unauthorized, invalid token
 *       '404':
 *         description: expense not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/delete/:id", isSignedIn, expenseController.deleteExpense);
module.exports = router;

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
 *       '401':
 *         description: Unauthorized, invalid token
 *       '500':
 *         description: Internal server error
 */

router.get("/list", isSignedIn, expenseController.listExpenses);

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
 *       '401':
 *         description: Unauthorized, invalid token
 *       '404':
 *         description: expense not found
 *       '500':
 *         description: Internal server error
 */
router.get("/get/:id", isSignedIn, expenseController.getEspecificExpense);

/**
 * @swagger
 * /api/update/{id}:
 *   put:
 *     summary: Upte a expense
 *     description: Endpoint to create a new expense.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               value:
 *                 type: number
 *               date:
 *                  type: string
 *                  format: DD/MM/YYYY
 *                  example: 01/01/2021
 *             required:
 *               - description
 *               - value
 *               - date
 *     responses:
 *       '201':
 *         description: New expense created
 *       '400':
 *         description: Bad request, invalid input
 *       '404':
 *         description: User not found or Invalid date
 *       '500':
 *         description: Internal server error
 */

router.put("/update/:id", isSignedIn, expenseController.updateExpense);

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
 *         description: expense deleted successfully
 *       '401':
 *         description: Unauthorized, invalid token
 *       '404':
 *         description: expense not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/delete/:id", isSignedIn, expenseController.deleteExpense);

module.exports = router;
