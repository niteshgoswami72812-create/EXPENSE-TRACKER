import { useEffect, useMemo, useState } from "react";
import { getEmptyTransaction, sampleTransactions } from "../data/finance-data";
import {
  getUserTransactions,
  saveUserTransactions,
} from "../lib/account-storage";

export function useTransactions(currentUser, showToast) {
  const [transactions, setTransactions] = useState(() =>
    currentUser ? getUserTransactions(currentUser.id) : [],
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(getEmptyTransaction);
  const [ready, setReady] = useState(Boolean(currentUser));

  useEffect(() => {
    if (!currentUser) {
      setTransactions([]);
      setModalOpen(false);
      setReady(false);
      return;
    }

    setTransactions(getUserTransactions(currentUser.id));
    setReady(true);
  }, [currentUser]);

  useEffect(() => {
    if (ready && currentUser) {
      saveUserTransactions(currentUser.id, transactions);
    }
  }, [transactions, ready, currentUser]);

  const totals = useMemo(
    () =>
      transactions.reduce(
        (result, transaction) => {
          result[transaction.type] += transaction.amount;
          return result;
        },
        { income: 0, expense: 0 },
      ),
    [transactions],
  );

  const balance = totals.income - totals.expense;
  const savingsRate = totals.income
    ? Math.round((balance / totals.income) * 100)
    : 0;

  function openAddModal() {
    setEditingId(null);
    setForm(getEmptyTransaction());
    setModalOpen(true);
  }

  function openEditModal(transaction) {
    setEditingId(transaction.id);
    setForm({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date,
    });
    setModalOpen(true);
  }

  function saveTransaction(event) {
    event.preventDefault();
    const title = form.title.trim();

    if (!title || form.amount <= 0 || !form.date) {
      showToast("Please enter a valid title, amount and date.");
      return;
    }

    setTransactions((current) => {
      if (editingId === null) {
        return [...current, { ...form, title, id: Date.now() }];
      }

      return current.map((transaction) =>
        transaction.id === editingId
          ? { ...form, title, id: editingId }
          : transaction,
      );
    });

    showToast(
      editingId === null
        ? "Transaction added successfully."
        : "Transaction updated successfully.",
    );
    setModalOpen(false);
  }

  function deleteTransaction(id) {
    if (!window.confirm("Delete this transaction? This cannot be undone.")) {
      return;
    }

    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id),
    );
    showToast("Transaction deleted.");
  }

  function exportTransactions() {
    const rows = [...transactions]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((transaction) =>
        [
          transaction.date,
          `"${transaction.title.replaceAll('"', '""')}"`,
          `"${transaction.category}"`,
          transaction.type,
          transaction.amount,
        ].join(","),
      );
    const csv = ["Date,Description,Category,Type,Amount", ...rows].join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = Object.assign(document.createElement("a"), {
      href: url,
      download: "paisaflow-transactions.csv",
    });

    link.click();
    URL.revokeObjectURL(url);
    showToast("CSV export downloaded.");
  }

  function resetSampleData() {
    if (
      !window.confirm("Reset all transactions to the original sample data?")
    ) {
      return;
    }

    setTransactions(sampleTransactions);
    showToast("Sample data restored.");
  }

  return {
    transactions,
    totals,
    balance,
    savingsRate,
    modalOpen,
    editingId,
    form,
    setForm,
    setModalOpen,
    openAddModal,
    openEditModal,
    saveTransaction,
    deleteTransaction,
    exportTransactions,
    resetSampleData,
  };
}
