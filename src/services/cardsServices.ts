import * as cardRepository from '../repositories/cardRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';
import { employeeNotFound } from '../utils/employeeNotFound.js';
import { typeAlreadyExistsError } from '../utils/typeAlreadyExistsError.js';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import { CardInsertData, TransactionTypes }from '../repositories/cardRepository';

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