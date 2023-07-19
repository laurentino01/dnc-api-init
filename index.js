const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const routes = require("./src/routes.js");
const swaggerOptions = { customCssUrl: "/swagger-ui.css" };

const authDocProd = require("./src/middlewares/authDocProd.js");

const app = express();

require("dotenv").config();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./public")));

if (process.env.NODE_ENV !== "test") {
  const swaggerFile = require("./swagger/swagger_output.json");
  app.get("/", (req, res) => {
    res.send("ola"); /*  res.redirect("/doc"); */
    /* #swagger.ignore = true */
  });
  /*  app.use(
    "/doc",
    authDocProd,
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, swaggerOptions)
  ); */
}

routes(app);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
