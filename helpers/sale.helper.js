const Sale_details = require("../models/sale_details.model");
const Inventory = require("../models/inventory");
const db = require("../database/config-mysql");
const axios = require("axios");

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

const getToken = async () => {
  const nequiUrl = "https://oauth.sandbox.nequi.com";

  try {
    const response = await axios.post(
      `${nequiUrl}/oauth2/token`,
      {
        grant_type: "client_credentials",
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.clientId}:${process.env.clientSecret}`
          ).toString("base64")}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    // console.error("Error al obtener el token:", error);
    throw error;
  }
};
const sendPayment = async (phoneNumber, value) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: await getToken(),
    "x-api-key": process.env.NEQUI_API_KEY,
  };

  const endpoint = `${"https://api.sandbox.nequi.com"}${"/payments/v2/-services-paymentservice-unregisteredpayment"}`;

  const data = {
    RequestMessage: {
      RequestHeader: {
        Channel: "PNP04-C001",
        RequestDate: "2020-01-17T20:26:12.654Z",
        MessageID: "1234567890",
        ClientID: "12345",
        Destination: {
          ServiceName: "PaymentsService",
          ServiceOperation: "unregisteredPayment",
          ServiceRegion: "C001",
          ServiceVersion: "1.2.0",
        },
      },
      RequestBody: {
        any: {
          unregisteredPaymentRQ: {
            phoneNumber: "3213100058",
            code: "NIT_1",
            value: "1000",
            reference1: "Referencia numero 1",
            reference2: "Referencia numero 2",
            reference3: "Referencia numero 3",
          },
        },
      },
    },
  };

  try {
    const response = await axios.request({
      url: endpoint,
      method: "POST",
      headers,
      data,
    });

    if (!!response && response.status === 200 && response.data) {
      const { data } = response;
      const { StatusCode: statusCode = "", StatusDesc: statusDesc = "" } =
        data.ResponseMessage.ResponseHeader.Status;

      if (statusCode === 0) {
        const { transactionId = "" } =
          data.ResponseMessage.ResponseBody.any.unregisteredPaymentRS;

        console.info(
          "Solicitud de pago realizada correctamente\n" +
            `- Id Transacción -> ${transactionId.trim()}`
        );
      } else {
        throw new Error(`Error ${statusCode} = ${statusDesc}`);
      }
    } else {
      throw new Error(
        "Unable to connect to Nequi, please check the information sent."
      );
    }
  } catch (error) {
    let msgError = "";

    if (error.isAxiosError) {
      const { status = "Undefined", statusText = "Undefined" } = error.response;

      msgError = `Axios error ${status} -> ${statusText}`;

      throw new Error("FINAL" + msgError);
    } else {
      throw error;
    }
  }
};

module.exports = { saleFormatt, allowQuantity, sellBooks, sendPayment };
