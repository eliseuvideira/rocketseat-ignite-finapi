const { body, params } = require("@ev-fns/validation");
const { Router } = require("express");
const {
  contasPostOne,
  contasGetMany,
  contasGetOne,
} = require("../endpoints/contas");
const {
  contasPostOneBody,
  contasGetOneParams,
} = require("../validations/contas");

const router = Router();

router.get("/contas", contasGetMany);

router.post("/contas", body(contasPostOneBody), contasPostOne);

router.get("/contas/:account_id", params(contasGetOneParams), contasGetOne);

module.exports = router;
