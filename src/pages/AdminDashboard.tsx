import { FC, useState } from "react";
import { Users, ShoppingCart, TrendingUp, Package, Eye, Edit, Trash2, Zap } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
  date: string;
}

const AdminDashboard: FC = () => {
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: "John Doe",
      amount: 16799,
      status: "completed",
      date: "2024-12-10",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      amount: 8399,
      status: "pending",
      date: "2024-12-11",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      amount: 33599,
      status: "completed",
      date: "2024-12-09",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header with Welcome Message */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">Welcome Back! 👋</h1>
            <p className="text-purple-200">Here's what's happening with your store today</p>
          </div>
        </div>
      </div>

      {/* Main Stats Grid with Enhanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Users Card */}
        <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-2xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-400 rounded-full opacity-20 group-hover:opacity-30 transition"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-blue-100" />
              <span className="text-green-100 text-sm font-bold bg-green-500 bg-opacity-30 px-3 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-blue-100 text-sm font-semibold mb-1">Total Users</p>
            <p className="text-4xl font-bold text-white mb-2">1,234</p>
            <p className="text-blue-100 text-xs">+125 new users this month</p>
          </div>
        </div>

        {/* Orders Card */}
        <div className="group relative bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-2xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-green-400 rounded-full opacity-20 group-hover:opacity-30 transition"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <ShoppingCart className="w-10 h-10 text-green-100" />
              <span className="text-green-100 text-sm font-bold bg-green-700 bg-opacity-50 px-3 py-1 rounded-full">+8%</span>
            </div>
            <p className="text-green-100 text-sm font-semibold mb-1">Total Orders</p>
            <p className="text-4xl font-bold text-white mb-2">5,678</p>
            <p className="text-green-100 text-xs">437 pending orders</p>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="group relative bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-2xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-400 rounded-full opacity-20 group-hover:opacity-30 transition"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-purple-100" />
              <span className="text-green-100 text-sm font-bold bg-green-500 bg-opacity-30 px-3 py-1 rounded-full">+15%</span>
            </div>
            <p className="text-purple-100 text-sm font-semibold mb-1">Total Revenue</p>
            <p className="text-4xl font-bold text-white mb-2">₱5,535,000</p>
            <p className="text-purple-100 text-xs">Best month yet! 🎉</p>
          </div>
        </div>

        {/* Products Card */}
        <div className="group relative bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-2xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-orange-400 rounded-full opacity-20 group-hover:opacity-30 transition"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-10 h-10 text-orange-100" />
              <span className="text-blue-100 text-sm font-bold bg-blue-500 bg-opacity-30 px-3 py-1 rounded-full">New</span>
            </div>
            <p className="text-orange-100 text-sm font-semibold mb-1">Active Products</p>
            <p className="text-4xl font-bold text-white mb-2">234</p>
            <p className="text-orange-100 text-xs">+5 new products today</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white bg-opacity-10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white border-opacity-20 hover:border-opacity-40 transition">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Recent Orders</h2>
              <p className="text-purple-200 text-sm">Track your latest transactions</p>
            </div>
            <div className="bg-purple-500 bg-opacity-20 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-purple-300" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white border-opacity-10">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-purple-200">Order ID</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-purple-200">Customer</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-purple-200">Amount</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-purple-200">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-purple-200">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-purple-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-white border-opacity-5 hover:bg-white hover:bg-opacity-5 transition group">
                    <td className="py-4 px-4 text-sm font-semibold text-white">{order.id}</td>
                    <td className="py-4 px-4 text-sm text-purple-100">{order.customer}</td>
                    <td className="py-4 px-4 text-sm font-bold text-green-300">₱{order.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                          order.status === "completed"
                            ? "bg-green-500 bg-opacity-20 text-green-300"
                            : order.status === "pending"
                            ? "bg-yellow-500 bg-opacity-20 text-yellow-300"
                            : "bg-red-500 bg-opacity-20 text-red-300"
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          order.status === "completed"
                            ? "bg-green-400"
                            : order.status === "pending"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                        }`}></div>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-purple-100">{order.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                        <button className="text-blue-400 hover:text-blue-300 transition hover:scale-110">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="text-green-400 hover:text-green-300 transition hover:scale-110">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition hover:scale-110">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white border-opacity-20 h-fit hover:border-opacity-40 transition">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
            <Zap className="w-6 h-6 text-yellow-300" />
          </div>
          <div className="space-y-4">
            <button className="w-full group bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition font-bold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              Add New Product
            </button>
            <button className="w-full group bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition font-bold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              View All Orders
            </button>
            <button className="w-full group bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition font-bold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Manage Users
            </button>
            <button className="w-full group bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition font-bold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
