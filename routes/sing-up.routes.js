const {Router} = require('express')
const {check} = require('express-validator')
const { singUp } = require('../controllers')
const { validate, dniExist, emailExist } = require('../middlewares')

const router = Router()

router.post('/',[
  check('email', 'Email is mandatory').custom(emailExist).notEmpty(),
  check('password', 'Password is mandatory').notEmpty(),
  check('user_name', 'Name is mandatory').notEmpty(),
  check('last_name', 'Lastname is mandatory').notEmpty(),
  check('document_number', 'DNI is mandatory').custom(dniExist).notEmpty(),
  validate
], singUp)

module.exports = router