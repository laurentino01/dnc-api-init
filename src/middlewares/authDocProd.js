const authDocProd = async (req, res, next) => {
  const { senhaDoc } = req.body;

  if (req.headers.host.includes("localhost") || req.originUrl !== "/doc/") {
    return next();
  }

  if (senhaDoc === process.env.SWAGGER_SENHA_DOC) {
    return next();
  }

  if (senhaDoc) {
    res.status(401).set("content-type", "text/html");
    res.send(
      Buffer.from(`
    <form method="post">
    <p style="color:red ">Senha inválida</p>
    <label for="senhaDoc">
        Senha: 
        <input type="password" name="senhaDoc" id="senhaDoc">
        <input type="submit" value="Entrar">
    </label>
</form>
    `)
    );
  } else {
    res.status(200).set("content-type", "text/html");
    res.send(
      Buffer.from(`
    <form method="post">
    <label for="senhaDoc">
        Senha: 
        <input type="password" name="senhaDoc" id="senhaDoc">
        <input type="submit" value="Entrar">
    </label>
</form>
    `)
    );
  }
};

module.exports = authDocProd;
