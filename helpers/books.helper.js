const Genre_Book = require("../models/book_genre");
const db = require("../database/config-mysql");
const ROLES = require("../helpers/role_enum");
const User = require("../models/User.model");
const Book_images = require('../models/book_images')

const addGenres = async (genres = [], bookid) => {

  genres.forEach(async (genre) => {
    try {
      let genre_book = new Genre_Book({ book: bookid, genre });
      await genre_book.save();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "something went wrong :(",
      });
    }
  });
};

const getGenres = async (books = []) => {
  try{
    let genrelist = await db.query(`select * from genre_book_view;`);
  books.forEach((book) => {
    book.dataValues.genres = [];
    let genres = genrelist[0].filter((value) => value.book_id == book.id);
    genres.forEach((element) => {
      let { genre_id, genre } = element;
      book.dataValues.genres.push({ genre, genre_id });
    });
  });
  }catch(error){
    console.log(error)
    return res.status(500)
  }
};

const asignSeller = async (books) => {

  try{
    const sellers = await User.findAll({
      where: { rol: ROLES.seller },
      attributes: ["user_name", "last_name", "id"],
    });
    books.forEach((book) => {
      let seller = sellers.find((value) => value.id == book.seller);
      book.seller = seller;
    });
  }catch(error){
    console.log(error)
    return res.status(500)
  }
};

const addImages = async (images = []) => {

  try{

    images.forEach(async (image) => {
      console.log(image);
      const bookImage = new Book_images(image)
      await bookImage.save()
    })
    
  }catch(error){
    console.log(error)
    throw new Error
  }

}

module.exports = {
  getGenres,
  addGenres,
  asignSeller,
  addImages
}