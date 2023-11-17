const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.generateToken = (id, role) => {
  const token = jwt.sign({ id, role }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  console.log(token);
  return token;
};
