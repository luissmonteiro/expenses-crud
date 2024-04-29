const mongoose = require("mongoose");
require("dotenv/config");

const MONGODB_URI = process.env.MONGODB;

mongoose
  .connect(MONGODB_URI, {
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

module.exports = mongoose.connection;
