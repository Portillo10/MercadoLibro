const Role = require("../models/role");
const ROLES = require("../helpers/role_enum")
// const roles = Role.findAll();


const sellerRol = async (req, res, next) => {
  const { user } = req;

  // console.log(roles);

  try {
    if (!user) {
      return res
        .status(401)
        .json({ msg: "There is not authenticated user rigth now" });
    }

    if (user.rol !== ROLES.seller) {
      return res.status(401).json({ msg: "You can not do this" });
    }

    next();
  } catch (error) {
    res.status(500).json({
      msg: "Error",
    });
  }
};

module.exports = {
  sellerRol,
};
