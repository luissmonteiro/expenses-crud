const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: User Signup
 *     description: Endpoint to register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request, invalid input
 *       '500':
 *         description: Internal server error
 */
router.post('/signup', authController.signup);


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User Login
 *     description: Endpoint to authenticate a user and generate a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *       '401':
 *         description: Unauthorized, invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.post('/login', authController.login);

module.exports = router;
