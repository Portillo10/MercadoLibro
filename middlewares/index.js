const books = require('./books.middleware')
const UniqueData = require('./UniqueData.middleware')
const user = require('./user.middleware')
const validate = require('./validate.middleware')
const validateJWT = require('./validateJWT.middleware')

module.exports = {
  ...books,
  ...UniqueData,
  ...user,
  ...validate,
  ...validateJWT,
}