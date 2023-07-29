const {DataTypes} = require('sequelize')
const db = require('../database/config-mysql');

const Book_images = db.define(
  'Book_images',
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    book:{
      type: DataTypes.STRING,
    },
    route:{
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    tableName: 'bookimages',
  })
module.exports = Book_images