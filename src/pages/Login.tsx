import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleOptions: Array<{ value: "user" | "admin"; label: string; helper: string }> = [
  { value: "user", label: "Customer", helper: "Shop, track orders, manage wishlists" },
  { value: "admin", label: "Admin", helper: "Monitor analytics and oversee sellers" },
];

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState<"user" | "admin">("user");
  const navigate = useNavigate();

  const deriveDisplayName = (inputEmail: string) => {
    if (!inputEmail) {
      return "Shopper";
    }

    const localPart = inputEmail.split("@")[0] || inputEmail;
    const tokens = localPart
      .split(/[._\-\s]+/)
      .map((token) => token.trim())
      .filter(Boolean);

    if (!tokens.length) {
      return localPart;
    }

    return tokens
      .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
      .join(" ");
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const displayName = deriveDisplayName(email);
    login({ role: userRole, name: displayName, email });
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.25),rgba(15,23,42,0.95))]" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:flex-row">
        <div className="relative order-first flex w-full items-end justify-start overflow-hidden bg-slate-900/60 text-white lg:w-1/2">
          <img
            src="/logo-commerce.jpg"
            alt="Marketplace operations overview"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/20" aria-hidden />
          <div className="relative space-y-4 p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-200">
              Trusted commerce gateway
            </span>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Welcome back to Syntax Sisters
            </h1>
            <p className="max-w-md text-sm text-white/70">
              Pick up where you left off—review orders, monitor fulfillment, and keep your carts conversion-optimized.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-center bg-slate-950/60 p-6 text-white lg:w-1/2 lg:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold">Sign in</h2>
              <p className="mt-2 text-sm text-white/60">Use your marketplace credentials to access your workspace.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white/40 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white/40 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-white">Role</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`rounded-2xl border px-4 py-3 transition ${
                      userRole === option.value
                        ? "border-indigo-400 bg-indigo-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={userRole === option.value}
                      onChange={(e) => setUserRole(e.target.value as "user" | "admin")}
                      className="hidden"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">{option.label}</p>
                      <p className="text-xs text-white/60">{option.helper}</p>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:from-indigo-600 hover:to-purple-600"
            >
              Continue to dashboard
            </button>

              <p className="text-center text-sm text-white/60">
                New to Syntax Sisters?{" "}
                <Link to="/register" className="font-semibold text-indigo-300 hover:text-white">
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
