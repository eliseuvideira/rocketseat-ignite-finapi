const { body, params } = require("@ev-fns/validation");
const { Router } = require("express");
const {
  contasPostOne,
  contasGetMany,
  contasGetOne,
  contasGetOneExtratosGetMany,
} = require("../endpoints/contas");
const {
  contasPostOneBody,
  contasGetOneParams,
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

module.exports = router;
