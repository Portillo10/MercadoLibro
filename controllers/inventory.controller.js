const Inventory = require("../models/inventory");
const db = require("../database/config-mysql");
const { formatInv, formatInvSeller } = require("../helpers/invFormatt.helper");

const getAllInventory = async (req, res) => {
  try {
    const inventory = await db.query(`select * from all_books;`);

    const invent = formatInv(inventory[0]);

    res.json(invent);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const postInventory = async (req, res) => {
  try {
    const { body } = req;

    const invent = new Inventory(body);

    await invent.save();

    res.status(200).json(invent);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const getOwnInventory = async (req, res) => {
  try {
    const { user } = req;

    const invent = await db.query(
      `select * from all_books where seller = "${user.id}"`
    );

    const inventory = formatInvSeller(invent[0]);

    res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const deleteInventory = async (req, res) => {

  try{
    const {invent_id} = req.body

    const deleteInv = await deleteInvByPK(invent_id)

    if (deleteInv <= 0) return res.status(401).json({msg:'Invent no exist'})

    res.status(200).json({ msg: "Deleted successfully" });

  }catch(error){
    console.log(error)
    return res.status(500)
  }
};

const deleteInvByPK = async (PK) => {

  try {

    const deleteInv = await Inventory.destroy({ where: { id: PK } });

    return deleteInv

  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = {
  getAllInventory,
  postInventory,
  getOwnInventory,
  deleteInventory
};
