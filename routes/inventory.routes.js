const { Router } = require("express");
const { check } = require("express-validator");
const { getAllInventory, postInventory, getOwnInventory, deleteInventory } = require("../controllers");
const { validateJWT, validate, sellerRol } = require("../middlewares");

const router = Router();

router.get("/all", getAllInventory);

router.get("/", [validateJWT, sellerRol, validate], getOwnInventory);

router.post("/", [
  validateJWT,
  sellerRol,
  check(
    ["book", "price", "stock"],
    "required field"
  ).notEmpty(),
  validate
], postInventory);

router.delete("/", [validateJWT, check("invent_id", "Required field").notEmpty(), validate], deleteInventory)

module.exports = router;
