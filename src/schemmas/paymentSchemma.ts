import joi from "joi";

const paymentSchemma = joi.object({
  password: joi.string().min(4).max(4).regex(/^\d+$/).required(),
  businessId: joi.number().min(1).required(),
  amount: joi.number().min(1).required(),
});

export default paymentSchemma;