const {
  saleFormatt,
  sellBooks,
  saveDetails
} = require("../helpers/sale.helper");
const Sale = require("../models/sale.model");
const { v4: uuidv4 } = require("uuid");
const StripeManager = require("../classes/stripe-manager");

const postPurchase = async (req, res) => {
  const { user, query } = req;
  const { sessionId } = query;

  try {
    const session = StripeManager.getSession(sessionId);

    if (!session) {
      return res.status(500).json({ msg: "Session expired" });
    }

    const sale = new Sale({
      address: session.address,
      customer: user.id,
      id: uuidv4(),
    });

    await sale.save();
    await saveDetails(session.line_items, sale.id);
    await sellBooks(session.line_items);

    // await sendPayment(3152599715, 2000)
    StripeManager.removeSession(sessionId);

    return res.status(200).json({ session });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
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

const cancelPurchase = async (req, res) => {
  const { sessionId } = req.query;

  try {
    return res
      .status(200)
      .json({ removedSession: StripeManager.removeSession(sessionId) });
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

module.exports = { getSales, getPurchases, postPurchase, cancelPurchase };
