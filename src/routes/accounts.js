const { body } = require("@ev-fns/validation");
const { Router } = require("express");
const { accountsPostOne } = require("../endpoints/accounts");
const { accountsPostOneBody } = require("../validations/accounts");

const router = Router();

router.post("/accounts", body(accountsPostOneBody), accountsPostOne);

module.exports = router;
