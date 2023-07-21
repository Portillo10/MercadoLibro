const { Router } = require("express");
const { check } = require("express-validator");
const { validate } = require("../middlewares/validate.middleware");
const { postBook, getAllBooks, getBookBySeller } = require("../controllers/books.controller");
const { validateJWT } = require("../middlewares/validateJWT.middleware");
const { sellerRol } = require("../middlewares/user.middleware");
const { validBook } = require("../middlewares/books.middleware");

const router = Router();

router.get("/", [validateJWT, sellerRol, validate], getBookBySeller);

router.get("/all", getAllBooks)

router.post(
  "/",
  [
    check("author", "Authors name mandatory").notEmpty(),
    check("title", "Title is mandatory").notEmpty(),
    check("page_number", "Number of page is mandatory").notEmpty(),
    check("genres", "Genre is mandatory").notEmpty(),
    validateJWT,
    sellerRol,
    validBook,
    validate,
  ],
  postBook
);

module.exports = router;
