import React from 'react';
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const stats = [
  { 
    name: 'Total Sales', 
    value: '$24,780', 
    change: '+12%', 
    changeType: 'increase',
    icon: ShoppingBag 
  },
  { 
    name: 'Total Orders', 
    value: '1,245', 
    change: '+8.2%', 
    changeType: 'increase',
    icon: Package 
  },
  { 
    name: 'Total Customers', 
    value: '845', 
    change: '+5.7%', 
    changeType: 'increase',
    icon: Users 
  },
  { 
    name: 'Avg. Order Value', 
    value: '$78.50', 
    change: '-2.3%', 
    changeType: 'decrease',
    icon: DollarSign 
  }
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', date: '2023-06-15', amount: '$245.00', status: 'Delivered' },
  { id: '#ORD-002', customer: 'Jane Smith', date: '2023-06-14', amount: '$189.99', status: 'Shipped' },
  { id: '#ORD-003', customer: 'Robert Johnson', date: '2023-06-14', amount: '$342.50', status: 'Processing' },
  { id: '#ORD-004', customer: 'Emily Davis', date: '2023-06-13', amount: '$124.99', status: 'Delivered' },
  { id: '#ORD-005', customer: 'Michael Brown', date: '2023-06-13', amount: '$89.99', status: 'Pending' },
];

const topProducts = [
  { name: 'Classic White T-Shirt', sales: 124, revenue: '$1,240.00' },
  { name: 'Slim Fit Jeans', sales: 98, revenue: '$2,940.00' },
  { name: 'Leather Wallet', sales: 76, revenue: '$1,140.00' },
  { name: 'Running Shoes', sales: 64, revenue: '$2,560.00' },
  { name: 'Winter Jacket', sales: 45, revenue: '$3,150.00' },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                <div className={`mt-2 flex items-center text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.changeType === 'increase' ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span>{stat.change} from last month</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Top Selling Products</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
                  {index + 1}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} sales • {product.revenue}</p>
                </div>
                <div className="ml-4">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm font-medium rounded-md bg-indigo-100 text-indigo-700">
              This Month
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-md">
              Last Month
            </button>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Sales chart will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
