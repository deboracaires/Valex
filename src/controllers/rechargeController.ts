import { Request, Response } from 'express';
import * as rechargeServices from '../services/rechargeServices.js';

export async function recharge(req: Request, res: Response) {
  try {
    const card = res.locals.card;
    const { amount } = req.body;
    await rechargeServices.postRecharge(card, amount);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}