const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validateJWT.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { sellerRol } = require("../middlewares/user.middleware");
const { getSales, getPurchases, postPurchase, cancelPurchase } = require("../controllers/sales.controller");
const { createSession } = require("../controllers/stripe-config.controller");

const router = Router();

router.get('/success',[validateJWT, check(['address', 'detail'], 'Required field')], postPurchase)
router.get('/cancel', [validateJWT, check(['address', 'detail'], 'Required field')], cancelPurchase)

router.post('/',[validateJWT, validate], createSession)


module.exports = router