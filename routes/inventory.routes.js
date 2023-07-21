const { Router } = require("express");
const { check } = require("express-validator");
const { getAllInventory, postInventory, getOwnInventory, deleteInventory } = require("../controllers/inventory.controller");
const { validateJWT } = require("../middlewares/validateJWT.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { sellerRol } = require("../middlewares/user.middleware");
const router = Router();

router.get("/all", getAllInventory);

router.get("/", [validateJWT, validate], getOwnInventory);

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
