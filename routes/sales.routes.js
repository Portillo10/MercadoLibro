const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, sellerRol, validate } = require("../middlewares");
const { getSales, getPurchases, postPurchase, createSession } = require("../controllers");

const router = Router();

router.get('/seller',[validateJWT, sellerRol, validate], getSales)
router.get('/customer', [validateJWT, validate], getPurchases)
router.post('/', [validateJWT, createSession, validate], postPurchase)

module.exports = router