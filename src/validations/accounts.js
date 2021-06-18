const Joi = require("joi");

exports.accountsPostOneBody = Joi.object()
  .keys({
    cpf: Joi.string()
      .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
      .required(),
    name: Joi.string().required(),
  })
  .required();
