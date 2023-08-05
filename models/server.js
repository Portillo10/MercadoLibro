const express = require("express");
const cors = require("cors");
const path = require('path')
// const fileUpload = require('express-fileupload')


const cookieParser = require("cookie-parser");
// const { dbConnection } = require('../database/config-db')
const MySQLconnection = require("../database/config-mysql");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.authPath = "/api/auth";
    // Conexion a la base de datos
    this.ConnectionDB();
    // middlewares
    this.middlewares();

    this.config();

    this.routes();
  }

  routes() {
    this.app.use("/auth", require("../routes/authlogin.routes"));
    this.app.use("/signup", require("../routes/sing-up.routes"));
    this.app.use("/book", require("../routes/Books.routes"));
    this.app.use("/books", require("../routes/inventory.routes"));
    this.app.use("/sales", require("../routes/sales.routes"));
    this.app.use("/upload", require("../routes/files.routes"));
    this.app.use("/payment", require("../routes/payment.routes"));
  }

  middlewares() {
    // cors
    this.app.use(cors());

    // lecture del body
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(express.json());

    this.app.use(cookieParser());

    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en el puerto " + this.port);
    });
  }

  config() {
    // this.app.set('view engine', 'ejs')
    // this.app.set()
  }

  async ConnectionDB() {
    // await dbConnection()
    try {
      await MySQLconnection.authenticate();
      console.log("MySQL connection");
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Server;
