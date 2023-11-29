const express = require("express");
const bodyParser = require("body-parser");
const Router = require("./src/foundation/common/route");
const app = express();
const PostgresService = require("./src/foundation/services/postgress.srvc");
const { port, allowedOrigins } = require("./src/foundation/common/constants");
const cors = require("cors");
class Server {
  constructor() {}

  static async use() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      cors({
        origin: function (origin, callback) {
          // Check if the request origin is included in the allowedOrigins array
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
      })
    );
    Router.load(app, "./api/src/controllers");

    PostgresService.InitalizeDBConnection();
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
}

Server.use();
