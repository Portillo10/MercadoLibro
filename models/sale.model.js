const { DataTypes } = require("sequelize");
const db = require("../database/config-mysql");

const Sale = db.define(
  "sale",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    customer: {
      type: DataTypes.STRING,
    },
    date_sale: {
      type: DataTypes.DATE,
      defaultValue: new Date().getTime(),
    },
    address: {
      type: DataTypes.INTEGER,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: "sale",
  }
);

module.exports = Sale