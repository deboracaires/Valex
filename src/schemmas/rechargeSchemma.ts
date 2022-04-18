import joi from "joi";

const rechargeSchemma = joi.object({
  amount: joi.number().min(1).required(),
});

export default rechargeSchemma;