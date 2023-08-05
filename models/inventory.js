const { DataTypes } = require("sequelize");
const db = require("../database/config-mysql");

const Inventory = db.define(
  "Inventory",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true
    },
    book: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
      defaultValue: 0
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    first_hand: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    sold:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: "Inventory",
  }
);

module.exports = Inventory;
