const { endpoint } = require("@ev-fns/endpoint");
const { HttpError } = require("@ev-fns/errors");
const { nanoid } = require("nanoid");
const { customers } = require("../functions/database");

exports.accountsPostOne = endpoint(async (req, res) => {
  const { cpf, name } = req.body;

  const exists = customers.some((x) => x.cpf === cpf);
  if (exists) {
    throw new HttpError(409, `Customer cpf: "${cpf}" already exists`);
  }

  const customer = {
    cpf,
    name,
    id: nanoid(),
    created_at: new Date(),
  };

  customers.push(customer);

  res.status(201).json(customer);
});
