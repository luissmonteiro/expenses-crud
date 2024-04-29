const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       required:
 *         - email
 *         - password
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /auth/signup:
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: New user created
 *       '400':
 *         description: Bad request, invalid input
 *       '409':
 *         description: Conflict, user already exists
 *       '500':
 *         description: Internal server error
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /auth/login:
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *       '401':
 *         description: Unauthorized, invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.post("/login", authController.login);

module.exports = router;
