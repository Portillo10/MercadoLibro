const authLogin = require("./authlogin.controller");
const books = require("./books.controller");
const inventory = require("./inventory.controller");
const multer_config = require("./multer_config.controller");
const sales = require("./sales.controller");
const sing_up = require("./sign_up.controller");
const stripe_config = require("./stripe_config.controller");
const users = require("./users.controller");

module.exports = {
  ...authLogin,
  ...books,
  ...inventory,
  ...multer_config,
  ...sales,
  ...sing_up,
  ...stripe_config,
  ...users,
};
