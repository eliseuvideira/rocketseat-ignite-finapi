const Joi = require("joi");

exports.contasPostOneBody = Joi.object()
  .keys({
    cpf: Joi.string()
      .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
      .required(),
    name: Joi.string().required(),
  })
  .required();

exports.contasPatchOneBody = Joi.object()
  .keys({ name: Joi.string() })
  .min(1)
  .required();

exports.contasGetOneParams = Joi.object()
  .keys({
    conta_id: Joi.string().required(),
  })
  .required();

exports.contasGetOneDepositarPostOneBody = Joi.object()
  .keys({
    valor: Joi.number().min(0).not(0).required(),
    descricao: Joi.string().required(),
  })
  .required();

exports.contasGetOneSacarPostOneBody = Joi.object()
  .keys({
    valor: Joi.number().min(0).not(0).required(),
  })
  .required();

exports.contasGetOneExtratosDataGetManyQuery = Joi.object()
  .keys({
    data: Joi.date().required(),
  })
  .required();
