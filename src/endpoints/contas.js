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

exports.contasPatchOne = endpoint(async (req, res) => {
  const { conta_id } = req.params;

  const conta = contas.find((x) => x.conta_id === conta_id);

  if (!conta) {
    throw new HttpError(404, "Not found");
  }

  const { name } = req.body;

  conta.name = name;

  res.status(200).json(conta);
});

exports.contasDeleteOne = endpoint(async (req, res) => {
  const { conta_id } = req.params;

  const conta = contas.find((x) => x.conta_id === conta_id);

  if (!conta) {
    throw new HttpError(404, "Not found");
  }

  const contaIndex = contas.findIndex((x) => x.conta_id === conta_id);

  contas.splice(contaIndex, 1);

  res.status(204).end();
});

exports.contasGetOneDepositarPostOne = endpoint(async (req, res) => {
  const { conta_id } = req.params;

  const conta = contas.find((x) => x.conta_id === conta_id);

  if (!conta) {
    throw new HttpError(404, "Not found");
  }

  const { descricao, valor } = req.body;

  const extrato = {
    descricao,
    valor,
    created_at: new Date(),
    tipo: "credito",
  };

  conta.extratos.push(extrato);

  res.status(201).json(extrato);
});

const getSaldo = (conta) =>
  conta.extratos.reduce(
    (prev, curr) => prev + (curr.tipo === "credito" ? 1 : -1) * curr.valor,
    0
  );

exports.contasGetOneSaldoGetOne = endpoint(async (req, res) => {
  const { conta_id } = req.params;

  const conta = contas.find((x) => x.conta_id === conta_id);

  if (!conta) {
    throw new HttpError(404, "Not found");
  }

  const saldo = getSaldo(conta);

  res.status(200).json({ saldo });
});

exports.contasGetOneSacarPostOne = endpoint(async (req, res) => {
  const { conta_id } = req.params;

  const conta = contas.find((x) => x.conta_id === conta_id);

  if (!conta) {
    throw new HttpError(404, "Not found");
  }

  const { valor } = req.body;

  const total = getSaldo(conta);

  if (valor > total) {
    throw new HttpError(400, `Saldo insuficiente para fazer saque`);
  }

  const extrato = {
    descricao: "Saque",
    valor,
    created_at: new Date(),
    tipo: "debito",
  };

  conta.extratos.push(extrato);

  res.status(201).json(extrato);
});

exports.contasGetOneExtratosDataGetMany = endpoint(async (req, res) => {
  const { conta_id } = req.params;

  const conta = contas.find((x) => x.conta_id === conta_id);

  if (!conta) {
    throw new HttpError(404, "Not found");
  }
  const { data } = req.query;

  const extratos = conta.extratos.filter(
    (x) => x.created_at.getTime() >= data.getTime()
  );

  res.status(200).json(extratos);
});
