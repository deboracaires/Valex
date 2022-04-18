import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export function validateSchemaMiddleware(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      const error = validation.error.details.map(error => error.message)
      return res.status(422).send(error);
    }
  
    next();
  }
}