const User = require("../models/user.model");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = { findByEmail };
