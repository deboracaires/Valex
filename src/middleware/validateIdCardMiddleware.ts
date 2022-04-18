import { Request, Response, NextFunction } from 'express';
import * as cardRepository from '../repositories/cardRepository.js';
import { cardNotFound } from '../utils/cardNotFound.js';

export async function validateIdCardMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const verifyId = await cardRepository.findById(Number(id));

    if (!verifyId) throw cardNotFound('id card was not found');

    res.locals.card = verifyId;

    next();
  }catch (err) {
    if (err.type === 'card-not-found') return res.status(404).send(err.message);
    console.log(err);
    res.sendStatus(500);
  }
}