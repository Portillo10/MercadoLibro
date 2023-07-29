const Sale_details = require("../models/sale_details.model");
const Inventory = require("../models/inventory");
const db = require("../database/config-mysql");

const saleFormatt = async (saleList) => {
  try {
    const details = await Sale_details.findAll({
      where: { sale: saleList.map((sale) => sale.id) },
    });

    const result = saleList.map((sale) => {
      const detail = details.filter((detail) => detail.sale === sale.id);
      return {
        ...sale.dataValues,
        detail,
      };
    });
    return result;
  } catch (error) {
    // console.log(error);
    throw new Error();
  }
};

const allowQuantity = async (obj = []) => {
  try {
    let cad = "";

    obj.forEach((book, i) => {
      cad +=
        i < obj.length - 1 ? "'" + book.id + "'" + "," : "'" + book.id + "'";
    });

    const books = await db.query(
      `select * from all_books where book in (${cad});`
    );

    let result = true;

    books[0].forEach((book) => {
      let bookCompare = obj.find((e) => e.id === book.book);

      if (book.stock < bookCompare.quantity) {
        result = false;
        return;
      }
    });

    return result;
  } catch (error) {
    throw new Error();
  }
};

const sellBooks = async (booklist = []) => {
  const Inventories = await Inventory.findAll({
    where: { book: booklist.map((book) => book.id) },
  });

  booklist.forEach(async (bookobj) => {

    let invent
    while (bookobj.quantity > 0) {
      invent = Inventories.find(
        (inv) => inv.book == bookobj.id && inv.stock > inv.sold
      );

      const realQuantity = invent.stock - invent.sold

      if (bookobj.quantity <= realQuantity){
        invent.sold += bookobj.quantity
        bookobj.quantity = 0
      }else{
        bookobj.quantity -= realQuantity
        invent.sold = invent.stock
      }

      await invent.save()

    }
  
  });

  console.log("invent");
};

module.exports = { saleFormatt, allowQuantity, sellBooks };
