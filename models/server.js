const express  = require("express");
const cors     = require("cors");
const path     = require('path')
const app      = express();
const server   = require('http').createServer(app)
const io       = require('socket.io')(server)
const cookieParser    = require("cookie-parser");
const MySQLconnection = require("../database/config-mysql");

class Server {
  constructor() {
    this.port     = process.env.PORT || 3000;
    this.authPath = "/api/auth";
    // Conexion a la base de datos
    this.ConnectionDB();
    // middlewares
    this.middlewares();

    this.config();

    this.routes();

    this.socket();
  }

  routes() {
    app.use("/auth", require("../routes/authlogin.routes"));
    app.use("/signup", require("../routes/sing-up.routes"));
    app.use("/book", require("../routes/Books.routes"));
    app.use("/books", require("../routes/inventory.routes"));
    app.use("/sales", require("../routes/sales.routes"));
    app.use("/payment", require("../routes/payment.routes"));
  }

  middlewares() {
    // cors
    app.use(cors());

    // lecture del body
    app.use(express.urlencoded({ extended: false }));

    app.use(express.json());

    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, "../public")));
  }

  socket() {
    require('../sockets/socket-config')
  }

  listen() {
    server.listen(this.port, () => {
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

module.exports = {Server, io};
