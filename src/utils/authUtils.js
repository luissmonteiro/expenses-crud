require("dotenv/config");
const bcrypt = require("bcryptjs");

const isEmptyOrSpaces = (str) => {
  return str === null || str.match(/^ *$/) !== null;
};

const notValidUser = (password, email) =>
  !password || isEmptyOrSpaces(password) || !email || isEmptyOrSpaces(email);

module.exports = { isEmptyOrSpaces, notValidUser };
