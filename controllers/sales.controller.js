const { saleFormatt, allowQuantity, sellBooks } = require("../helpers/sale.helper");
const Sale = require("../models/sale.model");
const Sale_details = require("../models/sale_details.model");
const { v4: uuidv4 } = require("uuid");

const postPurchase = async (req, res) => {
  const { user, body } = req;

  const { detail, ...rest } = body;

  try {
    const sale = new Sale({ ...rest, customer: user.id, id: uuidv4() });

    const obj = detail.map((det) => {
      return { id: det.book, quantity: det.quantity };
    });

    if (!await allowQuantity(obj)) {
      return res.status(401).json({
        msg: 'no stock'
      })
    }

    await sale.save();
    await saveDetails(detail, sale.id);
    await sellBooks(obj)

    res.status(200).json({sale});
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const saveDetails = async (details = [], sale) => {
  try {
    details.forEach(async (detail) => {
      let sale_detail = new Sale_details({ ...detail, sale });
      await sale_detail.save();
    });
  } catch (error) {
    throw new Error();
  }
};

const getSales = async (req, res) => {
  const { user } = req;

  try {
    const saleList = await Sale.findAll({ where: { seller: user.id } });

    const result = await saleFormatt(saleList);

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const getPurchases = async (req, res) => {
  const { user } = req;

  try {
    const saleList = await Sale.findAll({ where: { customer: user.id } });

    const result = await saleFormatt(saleList);

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = { getSales, getPurchases, postPurchase };
