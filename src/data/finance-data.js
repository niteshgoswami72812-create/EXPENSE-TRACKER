export const sampleTransactions = [
  {
    id: 1,
    title: "Salary Credit · HDFC Bank",
    amount: 62000,
    type: "income",
    category: "Salary",
    date: "2026-07-01",
  },
  {
    id: 2,
    title: "House Rent",
    amount: 6500,
    type: "expense",
    category: "Housing",
    date: "2026-07-02",
  },
  {
    id: 3,
    title: "Fresh Basket",
    amount: 2400,
    type: "expense",
    category: "Food & Dining",
    date: "2026-07-04",
  },
  {
    id: 4,
    title: "Zomato",
    amount: 650,
    type: "expense",
    category: "Food & Dining",
    date: "2026-07-14",
  },
  {
    id: 5,
    title: "Amazon India",
    amount: 1299,
    type: "expense",
    category: "Shopping",
    date: "2026-07-13",
  },
  {
    id: 6,
    title: "Spotify",
    amount: 119,
    type: "expense",
    category: "Subscriptions",
    date: "2026-07-12",
  },
  {
    id: 7,
    title: "BSES Electricity",
    amount: 1085,
    type: "expense",
    category: "Utilities",
    date: "2026-07-10",
  },
  {
    id: 8,
    title: "IndianOil Petrol Pump",
    amount: 1250,
    type: "expense",
    category: "Transport",
    date: "2026-07-08",
  },
  {
    id: 9,
    title: "Coffee House",
    amount: 447,
    type: "expense",
    category: "Food & Dining",
    date: "2026-07-06",
  },
];
export const expenseCategories = [
  "Food & Dining",
  "Housing",
  "Shopping",
  "Transport",
  "Utilities",
  "Subscriptions",
  "Health",
  "Education",
  "Other",
];
export const incomeCategories = [
  "Salary",
  "Freelance",
  "Investment",
  "Gift",
  "Other",
];
export const categoryBudgets = {
  "Food & Dining": 5000,
  Housing: 8000,
  Shopping: 5000,
  Transport: 3000,
  Utilities: 2500,
  Subscriptions: 1000,
};
export function getEmptyTransaction() {
  return {
    title: "",
    amount: 0,
    type: "expense",
    category: expenseCategories[0],
    date: new Date().toISOString().slice(0, 10),
  };
}
