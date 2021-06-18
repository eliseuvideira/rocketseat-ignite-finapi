const { endpoint } = require("@ev-fns/endpoint");

exports.accountsPostOne = endpoint(async (req, res) => {
  res.status(204).end();
});
