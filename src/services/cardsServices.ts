import * as cardRepository from '../repositories/cardRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';
import { employeeNotFound } from '../utils/employeeNotFound.js';
import { typeAlreadyExistsError } from '../utils/typeAlreadyExistsError.js';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import { CardInsertData, TransactionTypes, CardUpdateData }from '../repositories/cardRepository';
import { cardNotFound } from '../utils/cardNotFound.js';
import { expiredCardError } from '../utils/expiredCardError.js';
import { alreadyActivatedError } from '../utils/alreadyActivatedError.js';
import { cvcWrongError } from '../utils/cvcWrongError.js';

export async function createCard(employeeId: number, type: TransactionTypes) {
  const employeeData = await employeeRepository.findById(employeeId);

  if (!employeeData) throw employeeNotFound('employee was not found by this id');

  let typeTransaction: TransactionTypes = type;

  const verifyType = await cardRepository.findByTypeAndEmployeeId(type, employeeId);

  if (verifyType) throw typeAlreadyExistsError('this type is already exists'); 

  const fullName = employeeData.fullName.split(' ').filter((name) => name.length > 3);
  
  let cardName: string;

  fullName.map((name, index) => {
    if (index === 0){
      cardName = name; 
    } else if (index === fullName.length - 1){
      cardName = cardName + " " + name;
    } else {
      cardName = cardName + " " + name[0];
    }
  })

  const validateDate = dayjs().add(5, 'year').format('MM/YY');

  const cvv = faker.finance.creditCardCVV();
  const cvvHash = bcrypt.hashSync(cvv, 10);

  console.log(cvv)

  let card: CardInsertData = {
    employeeId,
    number: faker.finance.creditCardNumber('mastercard'),
    cardholderName: cardName,
    securityCode: cvvHash,
    expirationDate: validateDate,
    isVirtual: false,
    isBlocked: true,
    type: typeTransaction,
  };

  await cardRepository.insert(card);
  
}

export async function activateCard(cardId: number, cvc: number, password: string) {
  const verifyCard = await cardRepository.findById(cardId);
  
  if (!verifyCard) throw cardNotFound('id card was not found');
  
  const verifyDate = dayjs().format('MM/YY').split('/');
  const validateDate = verifyCard.expirationDate.split('/');  

  if ((verifyDate[1] === validateDate[1] && verifyDate[0] > validateDate[0])
  || (verifyDate[1] > validateDate[1])) {
    throw expiredCardError('this card is expired');
  }

  if (verifyCard.password !== null) throw alreadyActivatedError('this card is already activated');

  if (!bcrypt.compareSync(cvc.toString(), verifyCard.securityCode)) {
    throw cvcWrongError("security code doesn't match");
  }

  const passHash = bcrypt.hashSync(password, 10);

  let card: CardUpdateData = {
    password: passHash,
  };

  await cardRepository.update(cardId, card);
}