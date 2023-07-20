var express = require("express");
const connectDB = require("../middlewares/connectDB");
var router = express.Router();
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");
const errorHandler = require("../functions/errorHandler");
const jwt = require("jsonwebtoken");

router.post("/create", connectDB, async (req, res, next) => {
  try {
    // #swagger.tags = ['User']
    let { nome, email, senha } = req.body;
    const hashTimesNumber = 10;
    const hashPass = await bcrypt.hash(senha, hashTimesNumber);
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

router.post("/login", connectDB, async (req, res, next) => {
  try {
    // #swagger.tags = ['User']
    let { email, senha } = req.body;

    const DBres = await userSchema.findOne({ email }).select("+senha");
    if (DBres) {
      let correctPass = await bcrypt.compare(senha, DBres.senha);
      if (correctPass) {
        let token = jwt.sign({ id: DBres._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res.header("x-auth-token", token);
        res.status(200).json({
          status: "OK",
          statusMensagem: "Usuário autenticado com sucesso!",
          resposta: { "x-auth-token": token },
        });
      } else {
        throw new Error("Email ou senha inválidos");
      }
    } else {
      throw new Error("Email ou senha inválidos");
    }
  } catch (error) {
    return errorHandler(res, error);
  }
});

module.exports = router;
