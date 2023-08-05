const {DataTypes} = require('sequelize')
const db = require('../database/config-mysql');

const Book_images = db.define(
  'Book_images',
  {
    book:{
      type: DataTypes.STRING,
      primaryKey: true
    },
    route:{
      type: DataTypes.STRING,
      primaryKey: true
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: 'bookimages',
  })
module.exports = Book_images