const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validateJWT.middleware");
const { validate } = require("../middlewares/validate.middleware");
const {uploadFile} = require('../controllers/upload.controller')

const router = Router()

router.post('/', uploadFile)

module.exports = router