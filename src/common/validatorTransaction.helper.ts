import { arrayContains } from 'class-validator';

export const validateTransaction = (
  amount: number,
  transactionType: string,
): boolean => {
  const maxAmount = 10000000;

  // Validasi pertama: Pastikan amount kurang dari batas maksimum
  const isAmountValid = amount < maxAmount;

  const jsonString = '[ "topup", "transfer"]';

  let isInArray: boolean;
  // eslint-disable-next-line prefer-const
  isInArray = jsonString.includes(transactionType);

  return isAmountValid && isInArray;
};
