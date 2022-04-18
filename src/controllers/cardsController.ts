import { Request, Response } from 'express';
import * as cardServices from '../services/cardsServices.js';

export async function postCard(req: Request, res: Response) {
  try {
    const { employeeId, type } = req.body;

    await cardServices.createCard(employeeId, type);

    res.sendStatus(201);
  } catch (err) {
    if (err.type === 'employee-not-found') return res.status(404).send(err.message);
    if (err.type === 'card-already-exists') return res.status(409).send(err.message);
    console.log(err);
    res.sendStatus(500);
  }
}

export async function activateCard(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { cvc, password } = req.body;
    const card = res.locals.card;

    await cardServices.activateCard(Number(id), cvc, password, card);

    res.sendStatus(201);
  } catch (err) {
    if (err.type === 'card-not-found') return res.status(404).send(err.message);
    if (err.type === 'card-expired') return res.status(403).send(err.message);
    if (err.type === 'card-already-activated') return res.status(409).send(err.message);
    if (err.type === 'cvc-wrong') return res.status(401).send(err.message);
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getTransactionsAndPayment(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const balance = await cardServices.getBalance(Number(id));
    res.send(balance);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}