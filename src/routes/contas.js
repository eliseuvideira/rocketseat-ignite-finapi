const { body, params, query } = require("@ev-fns/validation");
const { Router } = require("express");
const {
  contasPostOne,
  contasGetMany,
  contasGetOne,
  contasGetOneExtratosGetMany,
  contasGetOneDepositarPostOne,
  contasGetOneSacarPostOne,
  contasGetOneExtratosDataGetMany,
  contasPatchOne,
  contasDeleteOne,
  contasGetOneSaldoGetOne,
} = require("../endpoints/contas");
const {
  contasPostOneBody,
  contasGetOneParams,
  contasGetOneDepositarPostOneBody,
  contasGetOneSacarPostOneBody,
  contasGetOneExtratosDataGetManyQuery,
  contasPatchOneBody,
} = require("../validations/contas");

const router = Router();

router.get("/contas", contasGetMany);

router.post("/contas", body(contasPostOneBody), contasPostOne);

router.get("/contas/:conta_id", params(contasGetOneParams), contasGetOne);

router.patch(
  "/contas/:conta_id",
  params(contasGetOneParams),
  body(contasPatchOneBody),
  contasPatchOne
);

router.delete("/contas/:conta_id", params(contasGetOneParams), contasDeleteOne);

router.get(
  "/contas/:conta_id/saldo",
  params(contasGetOneParams),
  contasGetOneSaldoGetOne
);

router.get(
  "/contas/:conta_id/extratos",
  params(contasGetOneParams),
  contasGetOneExtratosGetMany
);

router.post(
  "/contas/:conta_id/depositar",
  params(contasGetOneParams),
  body(contasGetOneDepositarPostOneBody),
  contasGetOneDepositarPostOne
);

router.post(
  "/contas/:conta_id/sacar",
  params(contasGetOneParams),
  body(contasGetOneSacarPostOneBody),
  contasGetOneSacarPostOne
);

router.get(
  "/contas/:conta_id/extratos/data",
  params(contasGetOneParams),
  query(contasGetOneExtratosDataGetManyQuery),
  contasGetOneExtratosDataGetMany
);

module.exports = router;
