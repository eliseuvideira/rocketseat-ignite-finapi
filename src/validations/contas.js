const Joi = require("joi");

exports.contasPostOneBody = Joi.object()
  .keys({
    cpf: Joi.string()
      .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
      .required(),
    name: Joi.string().required(),
  })
  .required();

exports.contasGetOneParams = Joi.object()
  .keys({
    conta_id: Joi.string().required(),
  })
  .required();

exports.contasGetOneDepositarPostOneBody = Joi.object()
  .keys({
    valor: Joi.number().min(0),
    descricao: Joi.string().required(),
  })
  .required();
