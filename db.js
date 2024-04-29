const mongoose = require("mongoose");
require("dotenv/config");

const MONGODB_URI =
  "mongodb://mongoadmin:secret@localhost:27017/EXPENSES_CRUD?authSource=admin";

mongoose
  .connect(MONGODB_URI, {
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

module.exports = mongoose.connection;
