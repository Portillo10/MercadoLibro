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
  let Inventories = await Inventory.findAll({
    where: { book: booklist.map((book) => book.id) },
  });

  booklist.forEach(async (bookobj) => {
    let invent;

    let provBook = {...bookobj}
    while (provBook.quantity > 0) {
      invent = Inventories.find(
        (inv) =>{
          // console.log(inv, bookobj);
          return (inv.book == provBook.id &&
            inv.stock > inv.sold &&
            inv.first_hand === Boolean(provBook.first_hand) &&
            inv.price === provBook.unity_price)
        }
          
      );

      const realQuantity = invent.stock - invent.sold;

      if (provBook.quantity <= realQuantity) {
        invent.sold += bookobj.quantity;
        provBook.quantity = 0;
      } else {
        provBook.quantity -= realQuantity;
        invent.sold = invent.stock;
      }

      await invent.save();
    }
  });
};

const saveDetails = async (details = [], sale) => {
  try {
    let total = 0;

    details.forEach(async (detail) => {
      const { first_hand, id, name, description, id: book, ...rest } = detail;
      let sale_detail = new Sale_details({ ...rest, book, sale });
      await sale_detail.save();
      total += detail.quantity * detail.unity_price;
    });
    return total;
  } catch (error) {
    throw new Error();
  }
};

module.exports = { saleFormatt, allowQuantity, sellBooks, saveDetails };
