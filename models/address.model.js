const {DataTypes} = require('sequelize')
const db = require('../database/config-mysql');

const Address = db.define(
  'Address',
  {
    id:{
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId:{
      type: DataTypes.STRING,
    },
    address:{
      type: DataTypes.STRING,
    },
    city:{
      type: DataTypes.INTEGER,
    },
    description_address:{
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: 'address',
  })
module.exports = Address