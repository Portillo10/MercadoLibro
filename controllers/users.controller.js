const User = require('../models/User.model')
const AddressModel = require('../models/address.model')

const getUser = (req, res) => {
  
}

const addAddress = async (req, res) => {

  const {body, user} = req

  try{
    const address = new AddressModel({...body, userId: user.id})
    await address.save()
    res.status(200).json(address)
  }catch(error){
    console.log(error)
    return res.status(500)
  }
}

const getAddress = async (req, res) => {

  const {user} = req

  try{
    const addressList = await AddressModel.findAll({where:{userId:user.id}})

    res.status(200).json(addressList)

  }catch(error){
    console.log(error)
    return res.status(500)
  }

}

module.exports = {addAddress, getAddress}