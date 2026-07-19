import { useEffect, useMemo, useState } from "react";
import { AuthPage } from "./components/auth/auth-page";
import { Sidebar, navigation } from "./components/layout/sidebar";
import { TransactionModal } from "./components/transactions/transaction-modal";
import { Icon } from "./components/ui/icon";
import { AnalyticsView } from "./components/views/analytics-view";
import { BudgetsView } from "./components/views/budgets-view";
import { DashboardView } from "./components/views/dashboard-view";
import { SettingsView } from "./components/views/settings-view";
import { TransactionsView } from "./components/views/transactions-view";
import { getEmptyTransaction, sampleTransactions } from "./data/finance-data";
import {
  authenticateUser,
  endUserSession,
  getSessionUser,
  getUsers,
  getUserTransactions,
  registerUser,
  saveUserTransactions,
  startUserSession,
  updateUserName,
} from "./lib/account-storage";
const viewDetails = {
  dashboard: {
    title: "",
    subtitle: "Here’s what’s happening with your money this month.",
  },
  transactions: {
    title: "Transactions",
    subtitle: "Review, filter and manage your financial activity.",
  },
  budgets: {
    title: "Monthly budgets",
    subtitle: "Stay on track with category-wise spending limits.",
  },
  analytics: {
    title: "Financial analytics",
    subtitle: "Understand where your money goes and how much you save.",
  },
  settings: {
    title: "Settings",
    subtitle: "Personalise your PaisaFlow experience.",
  },
};
export default function Home() {
  const [currentUser, setCurrentUser] = useState(getSessionUser);
  const [authMode, setAuthMode] = useState(() =>
    getUsers().length > 0 ? "login" : "signup",
  );
  const [loginEmail, setLoginEmail] = useState(
    () => getUsers()[0]?.email ?? "",
  );
  const [transactions, setTransactions] = useState(() =>
    currentUser ? getUserTransactions(currentUser.id) : [],
  );
  const [activeView, setActiveView] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(getEmptyTransaction);
  const [name, setName] = useState(() => currentUser?.name ?? "User");
  const [savedName, setSavedName] = useState(() => currentUser?.name ?? "User");
  const [toast, setToast] = useState("");
  const [hydrated, setHydrated] = useState(Boolean(currentUser));

  useEffect(() => {
    if (hydrated && currentUser) {
      saveUserTransactions(currentUser.id, transactions);
    }
  }, [transactions, hydrated, currentUser]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);
  const totals = useMemo(() => {
    return transactions.reduce(
      (result, transaction) => {
        result[transaction.type] += transaction.amount;
        return result;
      },
      { income: 0, expense: 0 },
    );
  }, [transactions]);
  const balance = totals.income - totals.expense;
  const savingsRate = totals.income
    ? Math.round((balance / totals.income) * 100)
    : 0;
  function showMessage(message) {
    setToast(message);
  }
  function navigateTo(view) {
    setActiveView(view);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
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
      showMessage("Please enter a valid title, amount and date.");
      return;
    }
    if (editingId !== null) {
      setTransactions((current) =>
        current.map((transaction) =>
          transaction.id === editingId
            ? { ...form, title, id: editingId }
            : transaction,
        ),
      );
      showMessage("Transaction updated successfully.");
    } else {
      setTransactions((current) => [
        ...current,
        { ...form, title, id: Date.now() },
      ]);
      showMessage("Transaction added successfully.");
    }
    setModalOpen(false);
  }
  function deleteTransaction(id) {
    if (!window.confirm("Delete this transaction? This cannot be undone."))
      return;
    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id),
    );
    showMessage("Transaction deleted.");
  }
  function exportTransactions() {
    const header = "Date,Description,Category,Type,Amount";
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
    const file = new Blob([[header, ...rows].join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "paisaflow-transactions.csv";
    link.click();
    URL.revokeObjectURL(downloadUrl);
    showMessage("CSV export downloaded.");
  }
  function saveProfile(event) {
    event.preventDefault();
    const cleanName = name.trim() || "Rahul";
    setName(cleanName);
    setSavedName(cleanName);
    if (currentUser) {
      const updatedUser = updateUserName(currentUser.id, cleanName);
      setCurrentUser(updatedUser);
    }

    showMessage("Profile settings saved.");
  }
  function resetSampleData() {
    if (!window.confirm("Reset all transactions to the original sample data?"))
      return;
    setTransactions(sampleTransactions);
    showMessage("Sample data restored.");
  }

  function signupUser(details) {
    const result = registerUser(details);
    if (!result.ok) return result;

    setLoginEmail(result.user.email);
    setAuthMode("login");
    return { ok: true };
  }

  function loginUser(credentials) {
    const result = authenticateUser(credentials.email, credentials.password);
    if (!result.ok) return result;

    startUserSession(result.user.id);
    setCurrentUser(result.user);
    setName(result.user.name);
    setSavedName(result.user.name);
    setTransactions(getUserTransactions(result.user.id));
    setHydrated(true);
    setActiveView("dashboard");
    return { ok: true };
  }

  function logoutUser() {
    endUserSession();
    setCurrentUser(null);
    setTransactions([]);
    setHydrated(false);
    setAuthMode("login");
    setModalOpen(false);
    setMenuOpen(false);
  }

  if (!currentUser) {
    return (
      <AuthPage
        mode={authMode}
        defaultEmail={loginEmail}
        onModeChange={setAuthMode}
        onSignup={signupUser}
        onLogin={loginUser}
      />
    );
  }

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const heading =
    activeView === "dashboard"
      ? `${greeting}, ${savedName}`
      : viewDetails[activeView].title;
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-slate-900">
      <Sidebar
        activeView={activeView}
        name={savedName}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={navigateTo}
        onLogout={logoutUser}
      />

      <div className="min-h-screen lg:ml-62">
        <header className="sticky top-0 z-20 flex min-h-31 items-center justify-between gap-4 border-b border-slate-200/70 bg-[#f7f8f5]/90 px-4 py-5 backdrop-blur-xl sm:px-6 lg:px-8">
          <button
            className="grid size-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Icon name="menu" />
          </button>

          <div className="min-w-0 flex-1">
            <p className="mb-1 hidden text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 sm:block">
              PaisaFlow · July 2026
            </p>
            <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {heading}
            </h1>
            <p className="mt-2 hidden text-sm text-slate-500 sm:block">
              {viewDetails[activeView].subtitle}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              className="relative hidden size-11 place-items-center rounded-xl border border-slate-200 bg-white sm:grid"
              onClick={() => showMessage("You’re all caught up!")}
              aria-label="Notifications"
            >
              <Icon name="bell" size={20} />
              <i className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-red-500 ring-1 ring-white" />
            </button>
            <button
              className="flex size-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700 sm:w-auto sm:px-5"
              onClick={openAddModal}
            >
              <Icon name="plus" size={19} />
              <span className="hidden sm:inline">Add transaction</span>
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-400 px-3 pb-24 pt-1 sm:px-6 lg:px-8 lg:pb-10">
          {activeView === "dashboard" && (
            <DashboardView
              transactions={transactions}
              income={totals.income}
              expenses={totals.expense}
              balance={balance}
              savingsRate={savingsRate}
              onNavigate={navigateTo}
            />
          )}
          {activeView === "transactions" && (
            <TransactionsView
              transactions={transactions}
              onEdit={openEditModal}
              onDelete={deleteTransaction}
              onExport={exportTransactions}
            />
          )}
          {activeView === "budgets" && (
            <BudgetsView transactions={transactions} />
          )}
          {activeView === "analytics" && (
            <AnalyticsView
              transactions={transactions}
              income={totals.income}
              expenses={totals.expense}
              savingsRate={savingsRate}
            />
          )}
          {activeView === "settings" && (
            <SettingsView
              name={name}
              onNameChange={setName}
              onSave={saveProfile}
              onExport={exportTransactions}
              onReset={resetSampleData}
            />
          )}
        </div>
      </div>

      <nav
        className="fixed inset-x-3 bottom-3 z-30 grid h-17 grid-cols-4 rounded-2xl border border-slate-200 bg-white/95 px-2 shadow-xl backdrop-blur lg:hidden"
        aria-label="Mobile navigation"
      >
        {navigation.slice(0, 4).map((item) => (
          <button
            key={item.id}
            className={`grid place-items-center content-center gap-1 text-[10px] font-medium ${activeView === item.id ? "text-emerald-700" : "text-slate-500"}`}
            onClick={() => navigateTo(item.id)}
          >
            <Icon name={item.icon} size={21} />
            {item.label}
          </button>
        ))}
      </nav>

      {modalOpen && (
        <TransactionModal
          form={form}
          editing={editingId !== null}
          onChange={setForm}
          onClose={() => setModalOpen(false)}
          onSubmit={saveTransaction}
        />
      )}

      {toast && (
        <div className="fixed bottom-22 left-4 right-4 z-60 flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl sm:bottom-6 sm:left-auto sm:right-6">
          <span className="grid size-6 place-items-center rounded-full bg-emerald-600">
            <Icon name="check" size={16} />
          </span>
          {toast}
        </div>
      )}
    </main>
  );
}
