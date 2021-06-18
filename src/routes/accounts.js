const { body, params } = require("@ev-fns/validation");
const { Router } = require("express");
const {
  accountsPostOne,
  accountsGetMany,
  accountsGetOne,
} = require("../endpoints/accounts");
const {
  accountsPostOneBody,
  accountsGetOneParams,
} = require("../validations/accounts");

const router = Router();

router.get("/accounts", accountsGetMany);

router.post("/accounts", body(accountsPostOneBody), accountsPostOne);

router.get(
  "/accounts/:account_id",
  params(accountsGetOneParams),
  accountsGetOne
);

module.exports = router;
