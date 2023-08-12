const { Router } = require("express");
const { check } = require("express-validator");
const { login, refreshToken } = require("../controllers");
const { validate, validateJWT } = require("../middlewares");

const router = Router();

// router.get()

router.post(
  "/",
  [
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password is mandatory").notEmpty(),
    validate,
  ],
  login
);

router.get('/', [validateJWT], refreshToken )

module.exports = router;
