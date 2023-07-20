var express = require("express");
const connectDB = require("../middlewares/connectDB");
var router = express.Router();
const errorHandler = require("../functions/errorHandler");
const authUser = require("../middlewares/authUser");
const taskSchema = require("../models/task");

router.post("/create", authUser, connectDB, async (req, res, next) => {
  try {
    // #swagger.tags = ['Task']
    let { posicao, titulo, descricao, status, dataEntrega } = req.body;
    const usuarioCriador = req.userJwt.id;
    const DBres = await taskSchema.create({
      posicao,
      titulo,
      descricao,
      status,
      dataEntrega,
      usuarioCriador,
    });

    res.status(200).json({
      status: "OK",
      statusMensagem: "Tarefa cadastrado com sucesso!",
      resposta: DBres,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
});

router.put("/edit/:id", authUser, connectDB, async (req, res, next) => {
  try {
    // #swagger.tags = ['Task']
    let idTarefa = req.params.id;
    let { posicao, titulo, descricao, status, dataEntrega } = req.body;
    const loggedUser = req.userJwt.id;

    const checkTask = await taskSchema.findOne({
      _id: idTarefa,
      usuarioCriador: loggedUser,
    });

    if (!checkTask) {
      throw new Error("Tarefa não existente");
    }

    const DBres = await taskSchema.updateOne(
      { _id: idTarefa },
      { posicao, titulo, descricao, status, dataEntrega }
    );

    res.status(200).json({
      status: "OK",
      statusMensagem: "Tarefa atualizada com sucesso!",
      resposta: DBres,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
});

module.exports = router;
