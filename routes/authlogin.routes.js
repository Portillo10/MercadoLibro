const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers");
const { validate } = require("../middlewares");

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

module.exports = router;
