const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
/*CORS*/
let corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const routesAuth = require("./routes/auth.routes");
const routesBalance = require("./routes/balance.routes");
const routesService = require("./routes/service.routes");
const routesTransaction = require("./routes/transaction.routes");

app.use("/v1/user/", routesAuth);
app.use("/v1/", routesService);
app.use("/v1/", routesTransaction);
app.use("/v1/", routesBalance);

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port `, PORT);
});
