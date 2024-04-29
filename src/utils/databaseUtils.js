const User = require("../models/user");

const findUser = async (userId) => {
  const user = await User.findOne({ _id: userId });
  return user;
};

module.exports = findUser;
