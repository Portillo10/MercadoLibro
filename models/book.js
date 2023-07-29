const { DataTypes } = require("sequelize");
const db = require("../database/config-mysql");

const Book = db.define(
  "Book",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    page_number: {
      type: DataTypes.SMALLINT,
    },
    seller: {
      type: DataTypes.STRING
    },
    state:{
      type: DataTypes.BOOLEAN,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: "Book",
  }
);

module.exports = Book;
