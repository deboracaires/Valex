import { Router } from "express";
import { newCardMiddleware } from "../middleware/newCardMiddleware.js";
import { validateSchemaMiddleware } from "../middleware/validateSchemmaMiddleware.js";
import newCardSchemma from "../schemmas/newCardSchemma.js";
import activateCardSchemma from "../schemmas/activateCardSchemma.js";
import * as cardsController from "../controllers/cardsController.js";

const cardsRouter = Router();

cardsRouter.post('/card', newCardMiddleware, validateSchemaMiddleware(newCardSchemma), cardsController.postCard);
cardsRouter.post('/card/activate/:id', validateSchemaMiddleware(activateCardSchemma), cardsController.activateCard);

export default cardsRouter;