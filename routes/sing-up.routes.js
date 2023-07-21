const {Router} = require('express')
const {check} = require('express-validator')
const { singUp } = require('../controllers/sign-up.controller')
const { validate } = require('../middlewares/validate.middleware')
const { dniExist, emailExist } = require('../middlewares/UniqueData.middleware')

const router = Router()

// router.get()

router.post('/',[
  check('email', 'Email is mandatory').custom(emailExist).notEmpty(),
  check('password', 'Password is mandatory').notEmpty(),
  check('user_name', 'Name is mandatory').notEmpty(),
  check('last_name', 'Lastname is mandatory').notEmpty(),
  check('document_number', 'DNI is mandatory').custom(dniExist).notEmpty(),
  validate
], singUp)

module.exports = router