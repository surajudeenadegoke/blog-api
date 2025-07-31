const bcrypt = require("bcrypt");

const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
module.exports = comparePassword;
