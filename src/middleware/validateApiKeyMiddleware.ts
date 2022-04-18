import { Request, Response, NextFunction } from 'express';
import * as companyRepository from '../repositories/companyRepository.js';
import * as cardRepository from '../repositories/cardRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';
import { companyAndEmployeeMatch } from '../utils/companyAndEmployeeMatchError.js';
import { apiKeyNotFound } from '../utils/apiKeyNotFoundError.js';

export async function validateApiKey(req: Request, res: Response, next: NextFunction) {
  try {
    const apiKey = req.headers['x-api-key'];
    const verifyApiKey = await companyRepository.findByApiKey(apiKey.toString());

    if (!verifyApiKey) throw apiKeyNotFound('api key does not match with any registered');

    let verifyEmployee;
    if (req.params.id) {
      const id = req.params.id;

      const verifyId = await cardRepository.findById(Number(id));
    
      verifyEmployee = await employeeRepository.findById(verifyId.employeeId);
    } 

    if (req.body.employeeId) {
      verifyEmployee = await employeeRepository.findById(req.body.employeeId);
    }
    if (!verifyEmployee) return res.sendStatus(404);

    if (verifyApiKey.id !== verifyEmployee.companyId) throw companyAndEmployeeMatch('this employee does not belong to this company');
    
    next();
  }catch (err) {
    if (err.type === 'api-key-not-found') return res.status(401).send(err.message);
    if (err.type === 'company-and-employee-match-error') return res.status(403).send(err.message);
    console.log(err);
    res.sendStatus(500);
  }
}