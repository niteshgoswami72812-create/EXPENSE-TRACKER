import { AnalyticsView } from "../views/analytics-view";
import { BudgetsView } from "../views/budgets-view";
import { DashboardView } from "../views/dashboard-view";
import { SettingsView } from "../views/settings-view";
import { TransactionsView } from "../views/transactions-view";

export function ViewContent({ activeView, finance, profile, onNavigate }) {
  const commonFinance = {
    transactions: finance.transactions,
    income: finance.totals.income,
    expenses: finance.totals.expense,
    savingsRate: finance.savingsRate,
  };

  if (activeView === "dashboard") {
    return (
      <DashboardView
        {...commonFinance}
        balance={finance.balance}
        onNavigate={onNavigate}
      />
    );
  }

  if (activeView === "transactions") {
    return (
      <TransactionsView
        transactions={finance.transactions}
        onEdit={finance.openEditModal}
        onDelete={finance.deleteTransaction}
        onExport={finance.exportTransactions}
      />
    );
  }

  if (activeView === "budgets") {
    return <BudgetsView transactions={finance.transactions} />;
  }

  if (activeView === "analytics") {
    return <AnalyticsView {...commonFinance} />;
  }

  return (
    <SettingsView
      name={profile.name}
      onNameChange={profile.setName}
      onSave={profile.saveProfile}
      onExport={finance.exportTransactions}
      onReset={finance.resetSampleData}
    />
  );
}
