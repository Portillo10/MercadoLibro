const { response, request } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //Email exist?
    const provUser = await User.findOne({ where: { email } });

    if (!provUser) {
      return res.status(401).json({
        msg: "Email doesn't exist.",
      });
    }

    //Correct password?
    // console.log(provUser);
    const pass = await bcrypt.compare(password, provUser.cifred_password);

    if (!pass) {
      return res.status(401).json({
        msg: "Incorrect password",
      });
    }
    //generate JWT

    const token = await generateJWT(provUser.id);

    if (!token) return res.status(403).json({ msg: "invalid token" });

    res.cookie("token", token);

    res.json({
      provUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};

module.exports = {
  login,
};
