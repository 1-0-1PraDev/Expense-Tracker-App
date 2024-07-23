export const calculateTotalAmount = (transactions) => {
  return transactions.reduce(
    (acc, expense) => {
      acc.totalExpense += expense.type === "expense" ? +expense.amount : 0;
      acc.totalIncome += expense.type === "income" ? +expense.amount : 0;

      return acc;
    },
    { totalIncome: 0, totalExpense: 0 }
  );
};
