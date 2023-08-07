const User = require("../models/User.model");

const emailExist = async (email = "") => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    throw new Error(`Email already exist`);
  }
};

const dniExist = async (document_number) => {
  const user = await User.findOne({ where: { document_number } });

  if (user) {
    throw new Error(`DNI is repeted`);
  }
};

module.exports = {
  emailExist,
  dniExist,
};
