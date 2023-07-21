const { DataTypes } = require("sequelize");
const db = require("../database/config-mysql");

const Role = db.define(
  "role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    rol_name: {
      type: DataTypes.STRING,
    }
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: "rol",
  }
);

module.exports = Role;
