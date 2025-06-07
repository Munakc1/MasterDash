'use client';

import React, { useEffect, useState } from 'react';
import colors from './constants/colors';
import SummaryCard from './components/SummaryCard';
import OrderStatusCard from './components/OrderStatusCard';
import CategoryBar from './components/CategoryBar';
import ProductBarChart from './components/ProductBarChart';

const mockData = [
  { category: 'Medicine', count: 12, barColor: colors.medicine },
  { category: 'Equipment', count: 6, barColor: colors.equipment },
  { category: 'Supplements', count: 3, barColor: colors.supplements },
];

const Page = () => {
  const [productsByCategory, setProductsByCategory] = useState<typeof mockData>([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timeout = setTimeout(() => {
      setProductsByCategory(mockData);
      setLoading(false);
    }, 1500); // simulate 1.5s loading time

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="space-y-6 p-4">
      {/* ✅ Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Analysis</h1>
        <p className="text-sm text-gray-600 mt-1">
          Welcome back! Here's an overview of your store's performance and patient data.
        </p>
      </div>

      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="New Patients" value={120} description="In the last 7 days" iconType="patients" />
        <SummaryCard title="Lab Tests Done" value={452} description="Across all departments" iconType="tests" />
        <SummaryCard title="Doctors Available" value={37} description="Currently on duty" iconType="doctors" />
        <SummaryCard title="Vaccines Administered" value={94} description="This week" iconType="vaccines" />
      </div>

      {/* ✅ Order Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <OrderStatusCard label="Pending Orders" count={45} total={120} bgColor="#0077B6" />
        <OrderStatusCard label="Shipped Orders" count={30} total={120} bgColor="#5FA8D3" />
        <OrderStatusCard label="Delivered Orders" count={40} total={120} bgColor="#4C956C" />
        <OrderStatusCard label="Cancelled Orders" count={5} total={120} bgColor="#D00000" />
      </div>

      {/* ✅ Charts */}
      <CategoryBar data={productsByCategory} isLoading={loading} />
      <ProductBarChart data={productsByCategory} colors={colors} />
    </div>
  );
};

export default Page;
