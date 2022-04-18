import { Router } from "express";
import * as rechargeController from '../controllers/rechargeController.js';
import { validateApiKey } from "../middleware/validateApiKeyMiddleware.js";
import { validateIdCardMiddleware } from "../middleware/validateIdCardMiddleware.js";
import { validateSchemaMiddleware } from "../middleware/validateSchemmaMiddleware.js";
import rechargeSchemma from "../schemmas/rechargeSchemma.js";

const rechargeRouter = Router();

rechargeRouter.post('/recharge/card/:id', validateIdCardMiddleware, validateApiKey, validateSchemaMiddleware(rechargeSchemma), rechargeController.recharge);

export default rechargeRouter;