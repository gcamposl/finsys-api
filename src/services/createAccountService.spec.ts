import { describe, expect, it } from 'vitest';
import { Account } from '../models/Account';
import { CreateAccountService } from './createAccountService';

describe('Create Account', () => {
  it('should be able create account', () => {
    const createAccount = new CreateAccountService();
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const account = {
      description: 'abc',
      value: 10,
      type: 'cost',
      comment: 'test',
      payDay: date,
    };

    expect(createAccount.execute(account)).resolves.toBeInstanceOf(Account);
  });
});
