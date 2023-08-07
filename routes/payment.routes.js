const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, sellerRol, validate } = require("../middlewares");
const { getSales, getPurchases, postPurchase, cancelPurchase, createSession } = require("../controllers");

const router = Router();

router.get('/success',[validateJWT, check(['address', 'detail'], 'Required field')], postPurchase)
router.get('/cancel', [validateJWT, check(['address', 'detail'], 'Required field')], cancelPurchase)
router.post('/',[validateJWT, validate], createSession)

module.exports = router