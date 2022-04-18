import { Router } from "express";
import { newCardMiddleware } from "../middleware/newCardMiddleware.js";
import { validateSchemaMiddleware } from "../middleware/validateSchemmaMiddleware.js";
import newCardSchemma from "../schemmas/newCardSchemma.js";
import * as cardsController from "../controllers/cardsController.js";

const cardsRouter = Router();

cardsRouter.post('/card', newCardMiddleware, validateSchemaMiddleware(newCardSchemma), cardsController.postCard);

export default cardsRouter;