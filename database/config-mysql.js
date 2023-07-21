const { Sequelize } = require("sequelize");

const connection = new Sequelize("MercadoLibro", "root", "Portillol-10", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
