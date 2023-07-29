const { DataTypes } = require("sequelize");
const db = require("../database/config-mysql");

const Sale_details = db.define(
  "sale_details",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    sale: {
      type: DataTypes.INTEGER,
    },
    book: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    unity_price: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "sale_details",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Sale_details