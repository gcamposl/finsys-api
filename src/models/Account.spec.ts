import { expect, test } from 'vitest';
import { Account } from './Account';

test('create an account', () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const account = new Account({
    description: 'conta de luz',
    value: 1000,
    type: 'cost',
    comment: 'esta conta tem que ser paga',
    payDay: date,
  });

  expect(account).toBeInstanceOf(Account);
});

test('enter account amount', () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const account = new Account({
    description: 'conta de luz',
    value: 0,
    type: 'cost',
    comment: 'esta conta tem que ser paga',
    payDay: date,
  });

  expect(account.value).toBeGreaterThanOrEqual(0);
});

test('create payday', () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  expect(() => {
    return new Account({
      description: 'conta de luz',
      value: 0,
      type: 'cost',
      comment: 'esta conta tem que ser paga',
      payDay: date,
    });
  }).toThrow();
});
