import { Card, CardContent } from "../../components/ui/card";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface IItem {
  id: number;
  name: string;
  description: string;
  original_price: number;
  final_price: number;
  discount: number;
  stock: number;
}

// =======================
// MOCK DATA TEMPORARY
// =======================

const items: IItem[] = [
  {
    id: 1,
    name: "Product A",
    description: "High quality item A",
    original_price: 200,
    final_price: 150,
    discount: 25,
    stock: 30,
  },
  {
    id: 2,
    name: "Product B",
    description: "High quality item B",
    original_price: 300,
    final_price: 240,
    discount: 20,
    stock: 12,
  },
  {
    id: 3,
    name: "Product C",
    description: "High quality item C",
    original_price: 150,
    final_price: 120,
    discount: 20,
    stock: 50,
  },
  {
    id: 4,
    name: "Product D",
    description: "High quality item D",
    original_price: 500,
    final_price: 400,
    discount: 20,
    stock: 8,
  },
  {
    id: 5,
    name: "Product E",
    description: "High quality item E",
    original_price: 100,
    final_price: 80,
    discount: 20,
    stock: 100,
  },
];

export default function DashboardStats() {
  const totalProducts = items.length;

  const totalStock = useMemo(
    () => items.reduce((acc, item) => acc + item.stock, 0),
    []
  );

  const avgPrice = useMemo(() => {
    return (
      items.reduce((acc, item) => acc + Number(item.final_price), 0) /
      items.length
    );
  }, []);

  const discountData = useMemo(() => {
    const map: Record<number, number> = {};
    items.forEach((item) => {
      map[item.discount] = (map[item.discount] || 0) + 1;
    });
    return Object.keys(map).map((key) => ({
      discount: key,
      count: map[Number(key)],
    }));
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-green-50 to-white">
      <h1 className="text-4xl font-extrabold text-green-700 mb-8 text-center drop-shadow-md">
        Products Statistics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 shadow-xl rounded-2xl">
          <CardContent className="text-center">
            <h2 className="text-lg font-semibold text-green-800">
              Total Products
            </h2>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-xl rounded-2xl">
          <CardContent className="text-center">
            <h2 className="text-lg font-semibold text-green-800">
              Total Stock
            </h2>
            <p className="text-3xl font-bold">{totalStock}</p>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-xl rounded-2xl">
          <CardContent className="text-center">
            <h2 className="text-lg font-semibold text-green-800">
              Average Price
            </h2>
            <p className="text-3xl font-bold">${avgPrice.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stock per Product */}
        <Card className="p-6 shadow-xl rounded-2xl">
          <CardContent>
            <h2 className="text-lg font-semibold text-green-800 mb-4">
              Stock per Product
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={items}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Discount distribution */}
        <Card className="p-6 shadow-xl rounded-2xl">
          <CardContent>
            <h2 className="text-lg font-semibold text-green-800 mb-4">
              Products per Discount %
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={discountData}>
                <XAxis dataKey="discount" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#facc15" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Price Trend */}
      <Card className="p-6 shadow-xl rounded-2xl mt-6">
        <CardContent>
          <h2 className="text-lg font-semibold text-green-800 mb-4">
            Price Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={items}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="final_price" stroke="#22c55e" />
              <Line type="monotone" dataKey="original_price" stroke="#f87171" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
