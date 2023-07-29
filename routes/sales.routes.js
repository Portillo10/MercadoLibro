const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validateJWT.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { sellerRol } = require("../middlewares/user.middleware");
const { getSales, getPurchases, postPurchase } = require("../controllers/sales.controller");

const router = Router();

router.get('/seller',[validateJWT, sellerRol, validate], getSales)
router.get('/customer', [validateJWT, validate], getPurchases)
router.post('/', [validateJWT, validate], postPurchase)

module.exports = router