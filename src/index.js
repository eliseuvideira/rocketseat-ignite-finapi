const dotenv = require("@ev-fns/dotenv");

dotenv(undefined, ({ NODE_ENV, npm_package_version }) => {
  console.info(`🌟 ${NODE_ENV}`);
  console.info(`🔖 ${npm_package_version}`);
});

const express = require("express");

const app = express();

const PORT = +process.env.PORT;

app.listen(PORT, () => {
  console.info(`🚀 http://localhost:${PORT}`);
});
