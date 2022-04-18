import { Router } from "express";
import { validateIdCardMiddleware } from "../middleware/validateIdCardMiddleware.js";
import { validateSchemaMiddleware } from "../middleware/validateSchemmaMiddleware.js";
import paymentSchemma from "../schemmas/paymentSchemma.js";
import * as paymentController from '../controllers/paymentController.js';

const paymentRouter = Router();

paymentRouter.post('/payment/card/:id', validateIdCardMiddleware, validateSchemaMiddleware(paymentSchemma), paymentController.postPayment);

export default paymentRouter;