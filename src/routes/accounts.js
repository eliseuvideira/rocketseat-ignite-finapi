const { Router } = require("express");
const { accountsPostOne } = require("../endpoints/accounts");

const router = Router();

router.post("/accounts", accountsPostOne);

module.exports = router;
