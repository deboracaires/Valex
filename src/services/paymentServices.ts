import dayjs from "dayjs";
import bcrypt from 'bcrypt';
import { expiredCardError } from "../utils/expiredCardError.js";
import { wrongPasswordError } from "../utils/wrongPasswordError.js";
import * as businessRepository from '../repositories/businessRepository.js';
import { businessNoExists } from "../utils/businessNoExistsError.js";
import { typeDoNotMatch } from "../utils/typeDoNotMatchError.js";
import * as cardsServices from '../services/cardsServices.js';
import { notEnoughBalance } from "../utils/notEnoughBalanceError.js";
import { PaymentInsertData } from "../repositories/paymentRepository.js";
import * as paymentRepository from '../repositories/paymentRepository.js';

export async function doPayment(card: object, password: string, businessId: number, amount: number) {
  const verifyDate = dayjs().format('MM/YY').split('/');
  const validateDate = card['expirationDate'].split('/');  
  
  if ((verifyDate[1] === validateDate[1] && verifyDate[0] > validateDate[0])
  || (verifyDate[1] > validateDate[1])) {
    throw expiredCardError('this card is expired');
  }

  if (!bcrypt.compareSync(password, card['password'])) {
    throw wrongPasswordError('the password does not match');
  }

  const verifyBusiness = await businessRepository.findById(businessId);

  if (!verifyBusiness) throw businessNoExists('this id business does not match');

  if (verifyBusiness.type !== card['type']) throw typeDoNotMatch('your card has a diferent type of the business');
  
  const cardData = await cardsServices.getBalance(card['id']);

  if (cardData.balance < amount) throw notEnoughBalance('not enough money to do this payment');
  
  let paymentData: PaymentInsertData = {
    cardId: card['id'],
    businessId,
    amount,
  }

  await paymentRepository.insert(paymentData);
}