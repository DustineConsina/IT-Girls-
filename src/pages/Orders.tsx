import { FC, useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Clock,
  CreditCard,
  FileText,
  MapPin,
  Package,
  PackageCheck,
  Truck,
} from "lucide-react";
import { Order, OrderStatus, useCart } from "../context/CartContext";

const statusLabels: Record<OrderStatus, string> = {
  processing: "Processing",
  packed: "Packed",
  shipped: "Shipped",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const statusStyles: Record<OrderStatus, string> = {
  processing: "bg-amber-500/15 text-amber-200 border border-amber-400/30",
  packed: "bg-indigo-500/15 text-indigo-200 border border-indigo-400/40",
  shipped: "bg-blue-500/15 text-blue-200 border border-blue-400/30",
  out_for_delivery: "bg-teal-500/15 text-teal-200 border border-teal-400/30",
  delivered: "bg-emerald-500/15 text-emerald-200 border border-emerald-400/30",
  cancelled: "bg-rose-500/15 text-rose-200 border border-rose-400/30",
};

const statusOrder: Record<OrderStatus, number> = {
  processing: 1,
  packed: 2,
  shipped: 3,
  out_for_delivery: 4,
  delivered: 5,
  cancelled: 0,
};

const statusOptions: OrderStatus[] = [
  "processing",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const formatCurrency = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
const formatDate = (value: string | undefined) =>
  value ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "TBD";
const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

const Orders: FC = () => {
  const { orders, updateOrderStatus } = useCart();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [activeOrderId, setActiveOrderId] = useState<string | null>(orders[0]?.id ?? null);

  const metrics = useMemo(() => {
    const lifetimeSpend = orders.reduce((sum, order) => sum + order.total, 0);
    const inTransit = orders.filter((order) => ["shipped", "out_for_delivery"].includes(order.status)).length;
    const awaiting = orders.filter((order) => ["processing", "packed"].includes(order.status)).length;
    const delivered = orders.filter((order) => order.status === "delivered").length;

    return {
      totalOrders: orders.length,
      lifetimeSpend,
      inTransit,
      awaiting,
      delivered,
    };
  }, [orders]);

  const statusFilters = useMemo(() => {
    const counts: Record<OrderStatus, number> = statusOptions.reduce((accumulator, status) => {
      accumulator[status] = orders.filter((order) => order.status === status).length;
      return accumulator;
    }, {} as Record<OrderStatus, number>);

    return [
      { id: "all" as const, label: "All", count: orders.length },
      ...statusOptions
        .filter((status) => counts[status] > 0)
        .map((status) => ({ id: status, label: statusLabels[status], count: counts[status] })),
    ];
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const scopedOrders = statusFilter === "all" ? orders : orders.filter((order) => order.status === statusFilter);

    return [...scopedOrders].sort(
      (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
    );
  }, [orders, statusFilter]);

  useEffect(() => {
    if (!filteredOrders.length) {
      setActiveOrderId(null);
      return;
    }

    if (!activeOrderId || !filteredOrders.some((order) => order.id === activeOrderId)) {
      setActiveOrderId(filteredOrders[0].id);
    }
  }, [filteredOrders, activeOrderId]);

  const activeOrder = useMemo(() => {
    if (!activeOrderId) {
      return null;
    }
    return filteredOrders.find((order) => order.id === activeOrderId) ?? null;
  }, [filteredOrders, activeOrderId]);

  const sortedTimeline = useMemo(() => {
    if (!activeOrder) {
      return [];
    }

    return [...activeOrder.events].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [activeOrder]);

  const handleMarkDelivered = () => {
    if (!activeOrder) {
      return;
    }
    if (["delivered", "cancelled"].includes(activeOrder.status)) {
      return;
    }
    updateOrderStatus(activeOrder.id, "delivered", "Delivery confirmed by shopper");
  };

  const renderOrderListItem = (order: Order) => {
    const isActive = order.id === activeOrderId;
    const badgeClass = statusStyles[order.status];
    const itemSummary = order.items
      .slice(0, 2)
      .map((item) => `${item.quantity}× ${item.name}`)
      .join(", ");
    const extraCount = order.items.length - 2;

    return (
      <button
        key={order.id}
        onClick={() => setActiveOrderId(order.id)}
        className={`w-full rounded-3xl border px-5 py-5 text-left transition ${
          isActive
            ? "border-white/40 bg-white/15 shadow-xl"
            : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">{order.reference}</p>
            <p className="text-xs text-purple-200">Placed {formatDate(order.placedAt)}</p>
          </div>
          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
            <PackageCheck size={14} />
            {statusLabels[order.status]}
          </span>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-purple-100">
            {itemSummary}
            {extraCount > 0 ? `, +${extraCount} more` : ""}
          </p>
          <div className="flex items-center justify-between text-sm text-white">
            <span>{formatCurrency(order.total)}</span>
            <span className="text-purple-200">ETA {formatDate(order.eta)}</span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900 text-white">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-16">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-purple-100">
                <FileText size={14} /> Order history
              </span>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Track every drop from checkout to doorstep
                </h1>
                <p className="max-w-2xl text-sm text-purple-100 sm:text-base">
                  Stay on top of delivery windows, status changes, and receipts. Your orders are synced across devices and update the moment fulfillment progresses.
                </p>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 lg:w-auto">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-purple-200">
                  <span>Total orders</span>
                  <Package size={16} className="text-purple-200" />
                </div>
                <p className="mt-3 text-2xl font-semibold text-white">{metrics.totalOrders}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-purple-200">
                  <span>Active shipments</span>
                  <Truck size={16} className="text-purple-200" />
                </div>
                <p className="mt-3 text-2xl font-semibold text-white">{metrics.inTransit}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-purple-200">
                  <span>Awaiting dispatch</span>
                  <Clock size={16} className="text-purple-200" />
                </div>
                <p className="mt-3 text-2xl font-semibold text-white">{metrics.awaiting}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-purple-200">
                  <span>Lifetime spend</span>
                  <CreditCard size={16} className="text-purple-200" />
                </div>
                <p className="mt-3 text-2xl font-semibold text-white">{formatCurrency(metrics.lifetimeSpend)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Latest updates</h2>
              <p className="text-sm text-purple-200">Filter your orders by fulfillment stage and drill into the details.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {statusFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setStatusFilter(filter.id)}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    statusFilter === filter.id
                      ? "border-white/40 bg-white/15 text-white"
                      : "border-white/10 bg-white/5 text-purple-200 hover:border-white/25 hover:bg-white/10"
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className="text-purple-200/80">{filter.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_minmax(340px,1fr)]">
            <div className="space-y-3">
              {filteredOrders.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-purple-200">
                  No orders match this filter yet.
                </div>
              ) : (
                filteredOrders.map((order) => renderOrderListItem(order))
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              {activeOrder ? (
                <div className="space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-purple-200">Reference</p>
                      <p className="text-xl font-semibold text-white">{activeOrder.reference}</p>
                      <p className="text-xs text-purple-200/80">Placed {formatDateTime(activeOrder.placedAt)}</p>
                    </div>
                    <div className="space-y-2 text-sm text-purple-200">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        <span>ETA {formatDate(activeOrder.eta)}</span>
                      </div>
                      {activeOrder.trackingNumber && (
                        <div className="flex items-center gap-2">
                          <Truck size={16} />
                          <span>{activeOrder.trackingNumber}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <BadgeCheck size={16} className="text-emerald-300" />
                        <span>{formatCurrency(activeOrder.total)}</span>
                      </div>
                    </div>
                  </div>

                  {!["delivered", "cancelled"].includes(activeOrder.status) && (
                    <button
                      onClick={handleMarkDelivered}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-indigo-600 hover:to-purple-600"
                    >
                      Confirm delivery
                      <ArrowUpRight size={16} />
                    </button>
                  )}

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-200">Items</h3>
                    <div className="space-y-3">
                      {activeOrder.items.map((item) => (
                        <div
                          key={`${activeOrder.id}-${item.productId}-${item.name}`}
                          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white">{item.name}</p>
                            <p className="text-xs text-purple-200">
                              {item.quantity} × {formatCurrency(item.price)}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-white">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-purple-100">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="mt-0.5 text-purple-200" />
                      <div>
                        <p className="font-semibold text-white">Shipping to {activeOrder.address.fullName}</p>
                        <p>{activeOrder.address.line1}</p>
                        {activeOrder.address.line2 && <p>{activeOrder.address.line2}</p>}
                        <p>
                          {activeOrder.address.city}, {activeOrder.address.region} {activeOrder.address.postalCode}
                        </p>
                        <p>{activeOrder.address.country}</p>
                        <p className="mt-1 text-xs text-purple-200/80">{activeOrder.address.contactNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard size={18} className="text-purple-200" />
                      <span>{activeOrder.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-200">Fulfillment timeline</h3>
                    <div className="space-y-3">
                      {sortedTimeline.map((event, index) => {
                        const isLast = index === sortedTimeline.length - 1;
                        const isComplete = statusOrder[event.status] <= statusOrder[activeOrder.status];
                        return (
                          <div key={`${event.status}-${event.timestamp}`} className="flex gap-4">
                            <div className="relative flex flex-col items-center">
                              <div
                                className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                                  isComplete ? "border-emerald-400 text-emerald-200" : "border-white/20 text-white/40"
                                }`}
                              >
                                {index + 1}
                              </div>
                              {!isLast && <span className="mt-1 h-8 w-px bg-white/10" />}
                            </div>
                            <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-3">
                              <p className="text-sm font-semibold text-white">{statusLabels[event.status]}</p>
                              {event.note && <p className="text-xs text-purple-200">{event.note}</p>}
                              <p className="mt-1 text-xs text-purple-200/80">{formatDateTime(event.timestamp)}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 p-12 text-center text-purple-200">
                  Select an order to view its details.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Orders;
