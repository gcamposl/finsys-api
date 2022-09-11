import { ObjectId } from 'mongodb';
import { Account } from '../models/Account';

interface CreateAccountRequest {
  description: string;
  value: number;
  type: string;
  comment: string;
  payDay: Date;
}

type CreateAccountResponse = Account;

export class CreateAccountService {
  async execute(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    const account = new Account(request);

    return account;
  }
}
