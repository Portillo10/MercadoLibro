const Book = require("../models/book");

const validBook = async (req, res, next) => {
  //verificamos que el ttitulo y autor del libro no se repitan
  const { user, body } = req;

  const { author, title, ...rest } = body;

  let book;

  if (author && title) {
    book = await Book.findOne({
      where: {
        author,
        title,
        seller: user.id
      },
    });
  }

  if (book) {
    return res.status(401).json({
      msg: "Repeated book",
    });
  }

  next();
};

module.exports = {
  validBook,
};
