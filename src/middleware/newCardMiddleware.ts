import { Request, Response, NextFunction} from 'express';
import * as companyRepository from '../repositories/companyRepository.js';

export async function newCardMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const apiKey = req.headers['x-api-key'];
    const verifyApiKey = await companyRepository.findByApiKey(apiKey.toString());

    if (!verifyApiKey) return res.sendStatus(401);
    
    const cardType = req.body.type;

    if (!(cardType === 'groceries' || cardType === 'restaurants' ||
    cardType === 'transport' || cardType === 'education' || cardType === 'health')) {
      return res.sendStatus(400);
    }
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}