import joi from "joi";

const activateCardSchemma = joi.object({
  cvc: joi.number().min(100).max(999).required(),
  password: joi.string().min(4).max(4).regex(/^\d+$/).required(),
});

export default activateCardSchemma;