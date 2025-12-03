import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusSquare,
  BarChart,
  ClipboardList,
} from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Statistics", icon: <BarChart size={20} />, path: "/admin/stats" },
    // { name: "Products", icon: <Package size={20} />, path: "/admin/products" },
    { name: "Edit Product", icon: <PlusSquare size={20} />, path: "/admin/add" },
    
    // {
    //   name: "Orders",
    //   icon: <ClipboardList size={20} />,
    //   path: "/admin/orders",
    // },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-green-600">Admin Panel</h1>

        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl font-medium transition 
                ${
                  location.pathname === item.path
                    ? "bg-green-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
