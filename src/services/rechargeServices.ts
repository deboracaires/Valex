import dayjs from "dayjs";
import { expiredCardError } from "../utils/expiredCardError.js";
import { RechargeInsertData } from '../repositories/rechargeRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';

export async function postRecharge(card: object, amount: number) {
  const verifyDate = dayjs().format('MM/YY').split('/');
  const validateDate = card['expirationDate'].split('/');  

  if ((verifyDate[1] === validateDate[1] && verifyDate[0] > validateDate[0])
  || (verifyDate[1] > validateDate[1])) {
    throw expiredCardError('this card is expired');
  }

  let rechargeData : RechargeInsertData  = {
    cardId: card['id'],
    amount
  }

  await rechargeRepository.insert(rechargeData);
}