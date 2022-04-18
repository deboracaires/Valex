import { NextFunction, Request, Response } from 'express';
import * as cardServices from '../services/cardsServices.js';

export async function postCard(req: Request, res: Response) {
  try {
    const { employeeId, type } = req.body;

    await cardServices.createCard(employeeId, type);

    res.sendStatus(201);
  } catch (err) {
    if (err.type === 'employee-not-found') return res.sendStatus(404);
    if (err.type === 'card-already-exists') return res.sendStatus(409);
    res.sendStatus(500);
  }
}
