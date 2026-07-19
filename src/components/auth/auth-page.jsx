import { useEffect, useState } from "react";
import { Icon } from "../ui/icon";

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";

export function AuthPage({
  mode,
  defaultEmail,
  onModeChange,
  onSignup,
  onLogin,
}) {
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: defaultEmail,
    password: "",
  });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (defaultEmail) {
      setLoginForm((current) => ({ ...current, email: defaultEmail }));
    }
  }, [defaultEmail]);

  function changeMode(nextMode) {
    setError("");
    setNotice("");
    onModeChange(nextMode);
  }

  function submitSignup(event) {
    event.preventDefault();
    setError("");

    if (!signupForm.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(signupForm.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (signupForm.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = onSignup(signupForm);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    setLoginForm({
      email: signupForm.email.trim().toLowerCase(),
      password: "",
    });
    setNotice("Account created successfully. Please log in.");
  }

  function submitLogin(event) {
    event.preventDefault();
    setError("");
    setNotice("");

    const result = onLogin(loginForm);
    if (!result.ok) setError(result.message);
  }

  const isLogin = mode === "login";

  return (
    <main className="grid min-h-screen bg-[#f7f8f5] lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-emerald-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-emerald-500/30" />
        <div className="absolute -bottom-32 -left-24 size-96 rounded-full bg-emerald-900/30" />

        <div className="relative flex items-center gap-3 text-2xl font-bold tracking-tight">
          <span className="grid size-11 place-items-center rounded-xl bg-white text-2xl font-bold italic text-emerald-700 shadow-xl">
            P
          </span>
          PaisaFlow
        </div>

        <div className="relative max-w-xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
            Your money, made simple
          </p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Build better money habits, one transaction at a time.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-emerald-100">
            Track expenses, manage monthly budgets and understand your savings
            with one clean dashboard.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {["Smart tracking", "Monthly budgets", "Clear analytics"].map(
              (feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm font-semibold backdrop-blur"
                >
                  <span className="mb-3 grid size-7 place-items-center rounded-full bg-emerald-400 text-emerald-950">
                    <Icon name="check" size={15} />
                  </span>
                  {feature}
                </div>
              ),
            )}
          </div>
        </div>

        <p className="relative text-sm text-emerald-200">
          A React + Tailwind CSS portfolio project
        </p>
      </section>

      <section className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-9 flex items-center gap-3 text-2xl font-bold tracking-tight lg:hidden">
            <span className="grid size-10 place-items-center rounded-xl bg-emerald-600 text-xl font-bold italic text-white">
              P
            </span>
            PaisaFlow
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
            {isLogin ? "Welcome back" : "Create your account"}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {isLogin ? "Log in to PaisaFlow" : "Start tracking today"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            {isLogin
              ? "Enter the same details you used during signup."
              : "Your details are saved locally in this browser for this demo."}
          </p>

          {notice && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {notice}
            </div>
          )}
          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {isLogin ? (
            <form className="mt-7 grid gap-5" onSubmit={submitLogin}>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Email address
                <input
                  className={inputClass}
                  type="email"
                  autoComplete="email"
                  value={loginForm.email}
                  onChange={(event) =>
                    setLoginForm({ ...loginForm, email: event.target.value })
                  }
                  placeholder="name@example.com"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Password
                <input
                  className={inputClass}
                  type="password"
                  autoComplete="current-password"
                  value={loginForm.password}
                  onChange={(event) =>
                    setLoginForm({ ...loginForm, password: event.target.value })
                  }
                  placeholder="Enter your password"
                />
              </label>
              <button
                className="mt-1 h-12 rounded-xl bg-emerald-600 font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700"
                type="submit"
              >
                Log in to dashboard
              </button>
            </form>
          ) : (
            <form className="mt-7 grid gap-4" onSubmit={submitSignup}>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Full name
                <input
                  className={inputClass}
                  autoComplete="name"
                  value={signupForm.name}
                  onChange={(event) =>
                    setSignupForm({ ...signupForm, name: event.target.value })
                  }
                  placeholder="Your full name"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Email address
                <input
                  className={inputClass}
                  type="email"
                  autoComplete="email"
                  value={signupForm.email}
                  onChange={(event) =>
                    setSignupForm({ ...signupForm, email: event.target.value })
                  }
                  placeholder="name@example.com"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Password
                  <input
                    className={inputClass}
                    type="password"
                    autoComplete="new-password"
                    value={signupForm.password}
                    onChange={(event) =>
                      setSignupForm({
                        ...signupForm,
                        password: event.target.value,
                      })
                    }
                    placeholder="Minimum 6 characters"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Confirm password
                  <input
                    className={inputClass}
                    type="password"
                    autoComplete="new-password"
                    value={signupForm.confirmPassword}
                    onChange={(event) =>
                      setSignupForm({
                        ...signupForm,
                        confirmPassword: event.target.value,
                      })
                    }
                    placeholder="Repeat password"
                  />
                </label>
              </div>
              <button
                className="mt-2 h-12 rounded-xl bg-emerald-600 font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700"
                type="submit"
              >
                Create account
              </button>
            </form>
          )}

          <p className="mt-7 text-center text-sm text-slate-500">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              className="font-bold text-emerald-700 hover:text-emerald-600"
              onClick={() => changeMode(isLogin ? "signup" : "login")}
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
