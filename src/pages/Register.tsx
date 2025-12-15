import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleOptions: Array<{ value: "user" | "admin"; label: string; helper: string }> = [
  { value: "user", label: "Customer", helper: "Shop exclusive drops with loyalty pricing" },
  { value: "admin", label: "Admin", helper: "Manage analytics and seller performance" },
];

export default function Register() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const displayName = deriveDisplayName(email);
    login({ role: userRole, name: displayName, email });
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.25),rgba(15,23,42,0.95))]" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:flex-row-reverse">
        <div className="relative order-first flex w-full items-end justify-start overflow-hidden bg-slate-900/60 text-white lg:w-1/2">
          <img
            src="/logo-commerce.jpg"
            alt="Marketplace catalog curation"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/20" aria-hidden />
          <div className="relative space-y-4 p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-pink-200">
              Join the marketplace
            </span>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Create your Syntax Sisters
            </h1>
            <p className="max-w-md text-sm text-white/70">
              Access exclusive product edits, bundle pricing, and seller tools designed for modern commerce teams.
            </p>
          </div>
        </div>

        <div className="w-full bg-slate-950/60 p-10 text-white lg:w-1/2">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">Create account</h2>
            <p className="mt-2 text-sm text-white/60">We’ll use these details to activate your marketplace workspace.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white/40 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white/40 focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-white">Role</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`rounded-2xl border px-4 py-3 transition ${
                      userRole === option.value
                        ? "border-pink-400 bg-pink-500/10"
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
              className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:from-pink-600 hover:to-purple-600"
            >
              Launch my account
            </button>

            <p className="text-center text-sm text-white/60">
              Already part of Marketplace HQ?{" "}
              <Link to="/login" className="font-semibold text-pink-200 hover:text-white">
                Sign in instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
