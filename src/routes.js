function routes(app) {
  app.use("/users", require("./routes/users.js"));
  app.use("/tasks", require("./routes/task.js"));
  return;
}

module.exports = routes;
