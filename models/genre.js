const { DataTypes } = require("sequelize");
const db = require("../database/config-mysql");

const Genre = db.define(
  "Genre",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    genre_name: {
      type: DataTypes.STRING,
    }
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: "Genre",
  }
);

module.exports = Genre;
