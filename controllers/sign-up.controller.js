const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");

const singUp = async (req, res) => {
  //recibimos la data
  try {
    const { password, ...data } = req.body;

    //encriptamos la contraseña
    const salt = bcrypt.genSaltSync();
    data.cifred_password = bcrypt.hashSync(password, salt);

    //generamos id y JWT
    const id = uuidv4();
    data.id = id;

    const jwt = await generateJWT(id);
    console.log(jwt);

    //creamos el usuario y lo guardamos en la bd
    const user = new User(data);
    await user.save();

    res.json({
      user,
      jwt,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

module.exports = {
  singUp,
};
