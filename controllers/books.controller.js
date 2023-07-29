const Book = require("../models/book");
const Genre = require("../models/genre");
const { v4: uuidv4 } = require("uuid");
const {asignSeller, getGenres, addGenres} = require('../helpers/books.helper')
const db = require('../database/config-mysql')

const getBookBySeller = async (req, res) => {
  const { user } = req;

  const books = await Book.findAll({ where: { seller: user.id, state:true } });

  await resBooks(books, res);
};

const getAllBooks = async (req, res) => {
  const books = await Book.findAll({where:{state:true}});

  await asignSeller(books);

  await resBooks(books, res);
};

const postBook = async (req, res) => {
  //recibimos la informacion del libro
  const { user, body } = req;

  const { genres, ...data } = body;

  try {
    const book = new Book({ id: uuidv4(), ...data, seller: user.id });
    await book.save();
    await addGenres(genres, book.id);
    const generos = await Genre.findAll({ where: { id: genres } });
    // console.log(book);
    res.json({
      book,
      generos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo salió mal",
    });
  }
};


const resBooks = async (books, res) => {
  try {

    await getGenres(books);

    res.json({
      books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "se ñañó :(",
    });
  }
};

const deleteBook = async (req, res) => {
  try{

    const {book_id} = req.query;
    // const deletedBooks = await Book.destroy({where:{id:book_id}})
    await db.query(`call delete_book("${book_id}")`)

    res.status(200).json({
      msg:'Book deleted successfully'
    })
  }catch(error){
    console.log(error)
    return res.status(500)
  }
}

module.exports = {
  getAllBooks,
  postBook,
  getBookBySeller,
  deleteBook
};

