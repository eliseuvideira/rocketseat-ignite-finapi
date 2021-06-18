const { endpoint } = require("@ev-fns/endpoint");
const { HttpError } = require("@ev-fns/errors");
const { nanoid } = require("nanoid");
const { contas } = require("../functions/database");

exports.contasGetMany = endpoint(async (req, res) => {
  res.status(200).json(contas);
});

exports.contasPostOne = endpoint(async (req, res) => {
  const { cpf, name } = req.body;

  const exists = contas.some((x) => x.cpf === cpf);
  if (exists) {
    throw new HttpError(409, `Customer cpf: "${cpf}" already exists`);
  }

  const customer = {
    cpf,
    name,
    account_id: nanoid(),
    created_at: new Date(),
  };

  contas.push(customer);

  res.status(201).json(customer);
});

exports.contasGetOne = endpoint(async (req, res) => {
  const { account_id } = req.params;

  const customer = contas.find((x) => x.account_id === account_id);

  if (!customer) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(customer);
});
