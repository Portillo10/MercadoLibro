const formatInv = (invents) => {
  const inventory = [];

  invents.forEach((invento) => {
    let invent = { ...invento };

    invent.bookobj = {
      id: invent.book,
      title: invent.Title,
      author: invent.Author,
      pages: invent.Page_number,
    };
    delete invent.book;
    delete invent.Title;
    delete invent.Author;
    delete invent.Page_number;

    invent.sellerobj = {
      id: invent.seller,
      name: invent.User_name,
      lastname: invent.Last_name,
      email: invent.Email,
    };

    delete invent.seller;
    delete invent.User_name;
    delete invent.Last_name;
    delete invent.rol;
    delete invent.Email;

    invent.first_hand = Boolean(invent.first_hand);

    inventory.push(invent);
  });

  return inventory;
};

const formatInvSeller = (invents) => {
  const inventory = formatInv(invents);

  inventory.forEach((invent) => {
    delete invent.sellerobj;
  });

  return inventory;
};

module.exports = { formatInv, formatInvSeller };
