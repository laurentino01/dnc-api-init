const mongoose = require("mongoose");
const validator = require("validator");

const schema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: "obrigatório",
    },
    email: {
      type: String,
      unique: true,
      required: "é obrigatório!",
      lowercase: true,
      index: true,
      validate: {
        validator: (valorDigitado) => {
          return validator.isEmail(valorDigitado);
        },
        message: "inválido!",
      },
    },
    senha: {
      type: String,
      required: "é obrigatório!",
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.models.User || mongoose.model("User", schema);
module.exports = userSchema;
