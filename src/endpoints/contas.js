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

  const conta = {
    cpf,
    name,
    conta_id: nanoid(),
    created_at: new Date(),
    extratos: [],
  };

  contas.push(conta);

  res.status(201).json(conta);
});

exports.contasGetOne = endpoint(async (req, res) => {
  const { conta_id } = req.params;

  const conta = contas.find((x) => x.conta_id === conta_id);

  if (!conta) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(conta);
});

exports.contasGetOneExtratosGetMany = endpoint(async (req, res) => {
  const { conta_id } = req.params;

  const conta = contas.find((x) => x.conta_id === conta_id);

  if (!conta) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(conta.extratos);
});
