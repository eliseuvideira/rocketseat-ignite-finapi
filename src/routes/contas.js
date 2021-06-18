const { body, params } = require("@ev-fns/validation");
const { Router } = require("express");
const {
  contasPostOne,
  contasGetMany,
  contasGetOne,
  contasGetOneExtratosGetMany,
  contasGetOneDepositarPostOne,
} = require("../endpoints/contas");
const {
  contasPostOneBody,
  contasGetOneParams,
  contasGetOneDepositarPostOneBody,
} = require("../validations/contas");

const router = Router();

router.get("/contas", contasGetMany);

router.post("/contas", body(contasPostOneBody), contasPostOne);

router.get("/contas/:conta_id", params(contasGetOneParams), contasGetOne);

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

module.exports = router;
