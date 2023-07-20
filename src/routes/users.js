var express = require("express");
const connectDB = require("../middlewares/connectDB");
var router = express.Router();
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");
const errorHandler = require("../functions/errorHandler");

router.post("/create", connectDB, async (req, res, next) => {
  try {
    // #swagger.tags = ['User']
    let { nome, email, password } = req.body;
    const hashTimesNumber = 10;
    const hashPass = await bcrypt.hash(password, hashTimesNumber);
    const DBres = await userSchema.create({
      nome,
      email,
      senha: hashPass,
    });

    res.status(200).json({
      status: "OK",
      statusMensagem: "Usuário cadastrado com sucesso!",
      resposta: DBres,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
});

module.exports = router;
