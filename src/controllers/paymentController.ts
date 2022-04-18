import { Request, Response } from "express";
import * as paymentServices from '../services/paymentServices.js';

export async function postPayment(req: Request, res: Response) {
  try {
    const card = res.locals.card;
    
    const { password, businessId, amount } = req.body;

    await paymentServices.doPayment(card, password, businessId, amount);

    res.sendStatus(201);
  } catch (err) {
    if (err.type === 'wrong-password') return res.status(401).send(err.message);
    if (err.type === 'business-not-found') return res.status(400).send(err.message);
    if (err.type === 'types-dont-match') return res.status(400).send(err.message);
    if (err.type === 'balance-not-enough') return res.status(403).send(err.message);
    console.log(err);
    res.sendStatus(500);
  }
}