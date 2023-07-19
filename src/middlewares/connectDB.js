const mongoose = require("mongoose");
const errorHandler = require("../functions/errorHandler");

async function connectDB(req = null, res = null, next = null) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("conectado ao banco de dados");
    try {
      next();
    } catch {}
    return mongoose;
  } catch (err) {
    console.error(err);
    errorHandler(res, "Error: Erro ao conectar no banco de dados");
    return err;
  }
}

module.exports = connectDB;
