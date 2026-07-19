import { useState } from "react";
import { AuthPage } from "./components/auth/auth-page";
import { AppHeader } from "./components/layout/app-header";
import { MobileNav } from "./components/layout/mobile-nav";
import { Sidebar } from "./components/layout/sidebar";
import { ViewContent } from "./components/layout/view-content";
import { TransactionModal } from "./components/transactions/transaction-modal";
import { Toast } from "./components/ui/toast";
import { useAuth } from "./hooks/use-auth";
import { useToast } from "./hooks/use-toast";
import { useTransactions } from "./hooks/use-transactions";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const { message, showToast } = useToast();
  const auth = useAuth(showToast);
  const finance = useTransactions(auth.currentUser, showToast);

  function navigateTo(view) {
    setActiveView(view);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function logout() {
    auth.logout();
    setActiveView("dashboard");
    setMenuOpen(false);
  }

  if (!auth.currentUser) {
    return (
      <AuthPage
        mode={auth.authMode}
        defaultEmail={auth.loginEmail}
        onModeChange={auth.setAuthMode}
        onSignup={auth.signup}
        onLogin={auth.login}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-slate-900">
      <Sidebar
        activeView={activeView}
        name={auth.savedName}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={navigateTo}
        onLogout={logout}
      />

      <div className="min-h-screen lg:ml-62">
        <AppHeader
          activeView={activeView}
          name={auth.savedName}
          onOpenMenu={() => setMenuOpen(true)}
          onAddTransaction={finance.openAddModal}
          onNotify={() => showToast("You’re all caught up!")}
        />

        <div className="mx-auto max-w-400 px-3 pb-24 pt-1 sm:px-6 lg:px-8 lg:pb-10">
          <ViewContent
            activeView={activeView}
            finance={finance}
            profile={auth}
            onNavigate={navigateTo}
          />
        </div>
      </div>

      <MobileNav activeView={activeView} onNavigate={navigateTo} />

      {finance.modalOpen && (
        <TransactionModal
          form={finance.form}
          editing={finance.editingId !== null}
          onChange={finance.setForm}
          onClose={() => finance.setModalOpen(false)}
          onSubmit={finance.saveTransaction}
        />
      )}

      <Toast message={message} />
    </main>
  );
}
