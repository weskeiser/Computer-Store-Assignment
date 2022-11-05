export const isEligible = (client, loanRequestAmount) => {
  const hasLoan = client.loan > 0;
  if (hasLoan) return false;

  const insufficientBalance = client.balance * 2 < loanRequestAmount;
  if (insufficientBalance) return false;

  return true;
};
