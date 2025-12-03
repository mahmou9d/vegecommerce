import { motion } from "framer-motion";
import { ShoppingCart, Package, Users, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      {/* ========== Header ========== */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Quick summary of store performance</p>
      </div>

      {/* ========== Stats Cards ========== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-md p-6 rounded-2xl border-l-4 border-green-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-600 text-sm font-medium">Total Sales</h2>
              <p className="text-2xl font-bold mt-1">$12,450</p>
            </div>
            <DollarSign size={32} className="text-green-600" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-md p-6 rounded-2xl border-l-4 border-blue-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-600 text-sm font-medium">Orders</h2>
              <p className="text-2xl font-bold mt-1">340</p>
            </div>
            <ShoppingCart size={32} className="text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-md p-6 rounded-2xl border-l-4 border-yellow-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-600 text-sm font-medium">Products</h2>
              <p className="text-2xl font-bold mt-1">120</p>
            </div>
            <Package size={32} className="text-yellow-600" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-md p-6 rounded-2xl border-l-4 border-purple-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-600 text-sm font-medium">Customers</h2>
              <p className="text-2xl font-bold mt-1">825</p>
            </div>
            <Users size={32} className="text-purple-600" />
          </div>
        </motion.div>
      </div>

      {/* ========== Charts Section (Placeholder) ========== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md h-72">
          <h2 className="text-lg font-semibold mb-3">Sales Chart</h2>
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            (Chart Coming Soon)
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md h-72">
          <h2 className="text-lg font-semibold mb-3">Orders Overview</h2>
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            (Chart Coming Soon)
          </div>
        </div>
      </div>

      {/* ========== Recent Orders Table ========== */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-gray-600">Order ID</th>
              <th className="py-3 text-gray-600">Customer</th>
              <th className="py-3 text-gray-600">Total</th>
              <th className="py-3 text-gray-600">Status</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4].map((id) => (
              <tr key={id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3">#{id}002</td>
                <td className="py-3">Ahmed Ali</td>
                <td className="py-3">$150</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-xl text-sm">
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
