const User = require("../../src/models/user");

const USER_EMAIL = "testuser1234@email.com";
const USER_PASS = "testpassword";

const expenseMock = {
  description: "test description",
  value: 10,
  date: "01/01/2022",
};

const alternativeExpense = {
  description: "updated test description",
  value: 20,
  date: "02/01/2022",
};

const clearDatabase = async () => await User.deleteOne({ email: USER_EMAIL });

module.exports = {
  clearDatabase,
  USER_EMAIL,
  USER_PASS,
  expenseMock,
  alternativeExpense,
};
