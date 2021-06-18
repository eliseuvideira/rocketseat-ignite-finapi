const dotenv = require("@ev-fns/dotenv");

dotenv(undefined, ({ NODE_ENV, npm_package_version }) => {
  console.info(`🌟 ${NODE_ENV}`);
  console.info(`🔖 ${npm_package_version}`);
});

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const routes = fs.readdirSync(path.join(__dirname, "routes"));
for (const route of routes) {
  app.use(require(path.join(__dirname, "routes", route)));
}

const PORT = +process.env.PORT;

app.listen(PORT, () => {
  console.info(`🚀 http://localhost:${PORT}`);
});
