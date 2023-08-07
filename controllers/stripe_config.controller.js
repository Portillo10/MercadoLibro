const Stripe = require('stripe')
const db = require('../database/config-mysql');
const { allowQuantity } = require('../helpers/sale.helper');
const StripeManager = require('../classes/stripe-manager')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const {v4:uuidv4} = require('uuid')

const createSession = async (req, res) => {
  const { user, body } = req;

  const { detail, address } = body;

  try{
    
    const stringIdInventory = detail.map((det, i) => `"${det.inventory}"`)

    // const invList = await Inventory.findAll({where:{id:idInventory}})
    const invList = await db.query(`select * from all_books where inventory in (${String(stringIdInventory)})`)
    
    const obj = detail.map((det) => {
      const inv = invList[0].find(invent => det.inventory === invent.inventory)

      return { id: inv.book, quantity: det.quantity, unity_price:inv.price, first_hand:inv.first_hand, name: inv.title, description: `Author: ${inv.author}` };
    });

    const line_items = obj.map((element)=> {
    
      let {name, description, unity_price:unit_amount, quantity } = element
  
      return {
        price_data:{
          product_data:{
            name,
            description
          },
          currency:'usd',
          unit_amount
        },
        quantity
      }
    })

    if (!await allowQuantity(line_items)) {
      return res.status(401).json({
        msg: 'no stock'
      })
    }

    const id = uuidv4()

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `http://localhost:5000/payment/success?sessionId=${id}`,
      cancel_url: `http://localhost:5000/payment/cancel?sessionId=${id}`
    })

    const {expires_at} = session
    
    StripeManager.addToQueue({id, line_items:obj, address, expires_at })

    res.status(200).json(session)
  
  }catch(error){
    // console.log(error)
    return res.status(500).json({
      error,
      msg: "Algo salió mal"
    })
  }
}

module.exports = {createSession}