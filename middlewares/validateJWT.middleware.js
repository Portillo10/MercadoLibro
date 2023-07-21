const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User")

const validateJWT = async (req = request, res = response, next) => {
  
  const token = req.header("api-key");

  if (!token) {
    return res.status(401).json({
      msg: "Token mandatory",
    });
  }

  try {
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findByPk(uid)

    req.user = user

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
