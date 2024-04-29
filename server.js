const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv/config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/authRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");
const db = require("./db");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const JWT_SECRET = process.env.JWT_SECRET;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

const app = express();
app.use(cookieParser(JWT_SECRET));
app.use(
  cookieSession({
    name: "session",
    keys: [JWT_SECRET],
  }),
);

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/api", expenseRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
