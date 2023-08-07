const { Router } = require("express");
const { check } = require("express-validator");
const { validate, validateJWT, sellerRol, validBook } = require("../middlewares");
const { postBook, getAllBooks, getBookBySeller, deleteBook, upload } = require("../controllers");

const router = Router();

router.get("/", [validateJWT, sellerRol, validate], getBookBySeller);

router.get("/all", getAllBooks);

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
    upload,
  ],
  postBook
);

router.delete(
  "/",
  [
    validateJWT,
    check("book_id", "is mandatory").notEmpty(),
    sellerRol,
    validate,
  ],
  deleteBook
);

module.exports = router;
