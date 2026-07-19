# PaisaFlow — React JSX Expense Tracker

PaisaFlow is a responsive expense tracker made with plain React JSX and Tailwind CSS. It does not use TypeScript, Bootstrap, Material UI, Next.js, or a backend.

## Features

- Add, edit and delete income or expense transactions
- Signup and login flow with matching email/password validation
- Session persistence and logout
- Multiple local accounts with completely separate transaction data
- Automatic balance, income, expense and savings calculations
- Search and filter by transaction type or category
- Monthly budget progress and category analytics
- CSV export
- Browser localStorage persistence
- Responsive desktop and mobile layouts

## Authentication note

This portfolio project stores demo accounts in browser `localStorage`, so it can run without a backend. Each account receives a unique ID and its own transaction-storage key. For a production application, authentication should use a secure backend, password hashing, a database and server-managed sessions.

## Run the project

```bash
npm install
npm run dev
```

## Create a production build

```bash
npm run build
```

## Main file structure

```text
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── dashboard/
│   ├── layout/
│   ├── transactions/
│   ├── ui/
│   └── views/
├── data/finance-data.js
└── lib/format.js
```
