const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validateJWT.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { sellerRol } = require("../middlewares/user.middleware");
const { getSales, getPurchases, postPurchase } = require("../controllers/sales.controller");
const { createSession } = require("../controllers/stripe-config.controller");

const router = Router();

router.get('/seller',[validateJWT, sellerRol, validate], getSales)
router.get('/customer', [validateJWT, validate], getPurchases)
router.post('/', [validateJWT, createSession, validate], postPurchase)

module.exports = router