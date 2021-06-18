const { endpoint } = require("@ev-fns/endpoint");
const { HttpError } = require("@ev-fns/errors");
const { nanoid } = require("nanoid");
const { customers } = require("../functions/database");

exports.accountsGetMany = endpoint(async (req, res) => {
  res.status(200).json(customers);
});

exports.accountsPostOne = endpoint(async (req, res) => {
  const { cpf, name } = req.body;

  const exists = customers.some((x) => x.cpf === cpf);
  if (exists) {
    throw new HttpError(409, `Customer cpf: "${cpf}" already exists`);
  }

  const customer = {
    cpf,
    name,
    account_id: nanoid(),
    created_at: new Date(),
  };

  customers.push(customer);

  res.status(201).json(customer);
});

exports.accountsGetOne = endpoint(async (req, res) => {
  const { account_id } = req.params;

  const customer = customers.find((x) => x.account_id === account_id);

  if (!customer) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(customer);
});
