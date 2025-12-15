import { FC, useState } from "react";
import { Bell, Lock, Moon, Save, Shield, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Settings: FC = () => {
  const { role, logout } = useAuth();
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return document.documentElement.classList.contains("dark");
  });

  const handleThemeToggle = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);

    if (typeof window === "undefined") {
      return;
    }

    if (nextTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900 text-white">
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-16">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-purple-100/70">Account settings</p>
          <h1 className="text-4xl font-semibold tracking-tight">Tune your workspace</h1>
          <p className="text-sm text-purple-100/80">
            Manage preferences, security, and notifications for your {role === "admin" ? "merchant" : "shopper"} experience.
          </p>
        </header>

        <section className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-200">
                <User size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="text-sm text-purple-100/70">Update how your name appears across the platform.</p>
              </div>
            </div>
            <form className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-purple-100/80">Display name</span>
                <input
                  type="text"
                  defaultValue={role === "admin" ? "Merchant Admin" : "Marketplace Shopper"}
                  className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-white/40 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-purple-100/80">Email address</span>
                <input
                  type="email"
                  defaultValue={role === "admin" ? "merchant@example.com" : "shopper@example.com"}
                  className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-white/40 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                <span className="text-purple-100/80">Bio</span>
                <textarea
                  rows={3}
                  placeholder="Share a quick note about your goals for this workspace"
                  className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-white/40 focus:outline-none"
                />
              </label>
              <button
                type="button"
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-indigo-600 hover:to-purple-600"
              >
                <Save size={16} /> Save profile
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-200">
                <Bell size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Notifications</h2>
                <p className="text-sm text-purple-100/70">Choose which updates land in your inbox or phone.</p>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="font-semibold text-white">Email updates</p>
                  <p className="text-xs text-purple-100/70">Product drops, order milestones, and weekly recaps.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailUpdates}
                  onChange={(event) => setEmailUpdates(event.target.checked)}
                />
              </label>
              <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="font-semibold text-white">SMS alerts</p>
                  <p className="text-xs text-purple-100/70">Out-for-delivery notifications and low-stock warnings.</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsUpdates}
                  onChange={(event) => setSmsUpdates(event.target.checked)}
                />
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-200">
                <Moon size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Appearance</h2>
                <p className="text-sm text-purple-100/70">Switch between themes to match your workflow.</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <div>
                <p className="font-semibold text-white">Dark mode</p>
                <p className="text-xs text-purple-100/70">We remember your choice on every device.</p>
              </div>
              <input type="checkbox" checked={darkMode} onChange={handleThemeToggle} />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-200">
                <Shield size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Security</h2>
                <p className="text-sm text-purple-100/70">Protect your account with layered safeguards.</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <Lock size={16} /> Update password
                </span>
                <span className="text-xs uppercase tracking-wide text-purple-100/70">Manage</span>
              </button>
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center justify-between rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 font-semibold text-rose-200 transition hover:border-rose-300/60 hover:bg-rose-500/20"
              >
                <span className="flex items-center gap-2">
                  <Lock size={16} /> Sign out
                </span>
                <span className="text-xs uppercase tracking-wide">Logout</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
