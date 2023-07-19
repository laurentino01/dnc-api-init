const s = require("string");

function errorHandler(res, err) {
  if (String(err).includes("validationError:")) {
    return res.status(400).json({
      status: "Error",
      statusMessage: s(String(err).replace("validationError: ", "")).replaceAll(
        ":",
        ""
      ).s,
      response: String(err),
    });
  }
  //   Pode ser um erro definito manualmente por min
  if (String(err).includes(`Error:`)) {
    return res.status(400).json({
      status: "Erro",
      statusMensagem: String(err).replace("Error: ", ""),
      resposta: String(err),
    });
  }

  //   Erro inesperado
  console.error(err);
  return res.status(500).json({
    status: "Erro",
    statusMensagem: "Houve um problema inesperado, tente novamente mais tarde.",
    resposta: String(err),
  });
}

module.exports = errorHandler;
