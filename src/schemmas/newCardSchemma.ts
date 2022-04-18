import joi from "joi";

const newCardSchemma = joi.object({
  employeeId: joi.number().min(1).required(),
  type: joi.string().required(),
});

export default newCardSchemma;