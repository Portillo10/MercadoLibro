

const validatePayment = async (req, res) => {

  const { user, body } = req;

  const { detail, ...rest } = body;

  try{
    const idInventory = detail.map((det, i) => det.inventory)
    const stringIdInventory = detail.map((det, i) => `"${det.inventory}"`)

    const invList = await db.query(`select * from all_books where inventory in (${String(stringIdInventory)})`)

    const obj = detail.map((det) => {
      const inv = invList[0].find(invent => det.inventory === invent.inventory)

      return { id: inv.book, quantity: det.quantity, unity_price:inv.price, first_hand:inv.first_hand, name: inv.title, description: `Author: ${inv.author}` };
    });

    req.line_items = obj

  }catch(error){
    console.log(error)
    return res.status(500)
  }

  
}