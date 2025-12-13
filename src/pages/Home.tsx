import { FC } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";

const Home: FC = () => {
  const { role } = useAuth();

  // Show admin dashboard for admins
  if (role === "admin") {
    return <AdminDashboard />;
  }

  // Show website about page for regular users
  const differentiators = [
    {
      icon: ShieldCheck,
      title: "Guaranteed authenticity",
      description: "Every seller is verified and inventory authenticated before it goes live.",
    },
    {
      icon: Truck,
      title: "Lightning fulfillment",
      description: "Priority picking and same-day dispatch available across our metro hubs.",
    },
    {
      icon: Calendar,
      title: "Launch playbook",
      description: "Exclusive product drops scheduled weekly with early access for members.",
    },
  ];

  const featuredCollections = [
    {
      tag: "Featured bundle",
      title: "Workflow power pack",
      description: "Top-selling laptops, monitors, and accessories bundled with member-only pricing.",
    },
    {
      tag: "Trending now",
      title: "Street-to-studio",
      description: "Multi-purpose sneakers and apparel curated from our highest converting merchants.",
    },
    {
      tag: "Smart home",
      title: "Connected comfort",
      description: "Automations, lighting, and audio gear designed to sync seamlessly out of the box.",
    },
  ];

  const curatedCategories = [
    { name: "Premium Tech", items: "Laptops & audio", emoji: "💻" },
    { name: "Sneaker Vault", items: "Running & lifestyle", emoji: "👟" },
    { name: "Everyday Carry", items: "Watches & bags", emoji: "👜" },
    { name: "Smart Haven", items: "Home automation", emoji: "🏡" },
  ];

  const communityMetrics = [
    { label: "SKUs in catalog", value: "1.2K" },
    { label: "Verified purchases", value: "48K" },
    { label: "Active shoppers", value: "32K" },
    { label: "Same-day cities", value: "28" },
  ];

  const heroHighlights = [
    "Protected payments with VaultPay escrow",
    "Free returns within 30 days",
    "Live order tracking on every shipment",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
          <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl" />
          <div className="absolute -bottom-32 left-16 h-48 w-48 rounded-full bg-indigo-400/25 blur-3xl" />
          <div className="relative z-10 space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-purple-100">
              <Sparkles size={14} /> Welcome to the marketplace
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Build the cart that keeps pace with your life
              </h1>
              <p className="max-w-2xl text-sm text-purple-100 sm:text-base">
                Shop limited releases, community-rated essentials, and bundles crafted by our buyer team. From workspace upgrades to weekend gear, every product ships fast and arrives ready to impress.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-600 hover:to-purple-600"
              >
                Start shopping
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Create an account
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {heroHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-purple-100"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-indigo-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {differentiators.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Icon size={20} className="text-indigo-200" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-purple-100">{description}</p>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Featured collections</h2>
              <p className="text-sm text-purple-200">Merchandising plays built to boost average order value and keep returns low.</p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-purple-100 transition hover:border-white/40 hover:bg-white/10"
            >
              View all collections
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredCollections.map((collection) => (
              <div
                key={collection.tag}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/10"
              >
                <span className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-100">
                  {collection.tag}
                </span>
                <h3 className="text-lg font-semibold text-white">{collection.title}</h3>
                <p className="mt-3 text-sm text-purple-100">{collection.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Shop by category</h2>
              <p className="text-sm text-purple-200">Curated edits designed to shorten the path from browse to buy.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-100">
              Updated weekly
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {curatedCategories.map((category) => (
              <Link
                key={category.name}
                to="/shop"
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10"
              >
                <div className="text-4xl">{category.emoji}</div>
                <h3 className="mt-4 text-base font-semibold text-white">{category.name}</h3>
                <p className="text-xs text-purple-200">{category.items}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Marketplace metrics</h2>
              <p className="text-sm text-purple-200">Signals from shoppers and sellers who rely on our checkout flow daily.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {communityMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl"
              >
                <p className="text-4xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-sm text-purple-200">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 p-10 shadow-2xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <h3 className="text-3xl font-semibold">Ready to upgrade your cart?</h3>
                <p className="text-sm text-indigo-100">
                  Sync wishlists across devices, follow product alerts, and unlock member-only bundles built to convert.
                </p>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                Browse the marketplace
                <ShoppingBag size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl font-semibold text-white">Never miss the next launch</h2>
            <p className="text-sm text-purple-100">
              Subscribe for early access to product drops, curated lookbooks, and conversion-boosting bundle alerts. Weekly insights only—no spam.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-purple-200/70 focus:border-white/40 focus:outline-none"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:from-indigo-600 hover:to-purple-600">
                Subscribe
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
