const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model")

const validateJWT = async (req = request, res = response, next) => {
  
  const {token} = req.cookies;

  console.log(req.cookies);

  if (!token) {
    return res.status(401).json({
      msg: "Token mandatory",
    });
  }

  try {
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findByPk(uid)

    const {cifred_password, ...userData} = user.dataValues

    req.user = userData

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
