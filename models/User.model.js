const { Sequelize, DataTypes } = require("sequelize");
const db = require('../database/config-mysql')


const User = db.define('Users', {
  id:{
    type: DataTypes.STRING,
    primaryKey: true
  },
  rol:{
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  cifred_password:{
    type: DataTypes.STRING
  },
  email:{
    type: DataTypes.STRING,
    unique: true
  },
  user_name:{
    type: DataTypes.STRING
  },
  last_name:{
    type: DataTypes.STRING
  },
  document_number:{
    type: DataTypes.BIGINT,
    unique: true
  }
}, {
  createdAt: false,
  updatedAt: false
})

module.exports = User