const { DataTypes } = require("sequelize");
const db = require("../database/config-mysql");

const genre_book = db.define("genre_book", {
  book: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  genre: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
}, {
  createdAt: false,
  updatedAt: false,
  tableName: 'genre_book'
});

module.exports = genre_book