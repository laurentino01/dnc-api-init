const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    posicao: {
      type: Number,
      required: "é obrigatório!",
    },
    titulo: {
      type: String,
      required: "é obrigatório!",
    },
    descricao: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      required: "é obrigatório!",
    },
    dataEntrega: {
      type: Date,
      default: null,
    },
    usuarioCriador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "é obrigatório!",
    },
  },
  {
    timestamps: true,
  }
);

const taskSchema = mongoose.models.Task || mongoose.model("Task", schema);
module.exports = taskSchema;
