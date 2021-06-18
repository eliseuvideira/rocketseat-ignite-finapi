const dotenv = require("@ev-fns/dotenv");

dotenv(undefined, ({ NODE_ENV, npm_package_version }) => {
  console.info(`🌟 ${NODE_ENV}`);
  console.info(`🔖 ${npm_package_version}`);
});

const express = require("express");
const fs = require("fs");
const path = require("path");
const { notFound, exception } = require("@ev-fns/errors");
const { json } = require("body-parser");

const app = express();

app.use(json());

const routes = fs.readdirSync(path.join(__dirname, "routes"));
for (const route of routes) {
  app.use(require(path.join(__dirname, "routes", route)));
}

app.use(notFound);
app.use(exception);

const PORT = +process.env.PORT;

app.listen(PORT, () => {
  console.info(`🚀 http://localhost:${PORT}`);
});
