const errorHandler = require("../functions/errorHandler");
const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const token = req.headers("x-auth-token");

  if (!token) {
    errorHandler(res, new Error("Token não fornecido!"));
  }

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    req.userJwt = decoded;

    next();
  } catch (error) {
    errorHandler(res, new Error("Token inválido!"));
  }
};

module.exports = authUser;
