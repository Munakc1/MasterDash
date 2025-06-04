'use client';

import React from "react";
import {
  Card as MuiCard,
  CardContent,
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

// Color palette
const colors = {
  primary: "#0077B6",
  lightBlue: "#CAF0F8",
  midBlue: "#5FA8D3",
  successGreen: "#4C956C",
  accentOrange: "#F4A261",
  darkText: "#333333",
};

// Sample store data for analysis
const analysisData = {
  storeName: "Mayuk Medical",
  totalSales: 120000,
  vendorRating: 4.5,
  totalOrders: 450,
  totalProducts: 21,
  orderSummary: {
    completed: 400,
    cancelled: 30,
    noOrders: 20,
  },
  productsByCategory: [
    { category: "Medicine", count: 12 },
    { category: "Equipment", count: 6 },
    { category: "Supplements", count: 3 },
  ],
};

export default function AnalysisPage() {
  const {
    storeName,
    totalSales,
    vendorRating,
    totalOrders,
    totalProducts,
    orderSummary,
    productsByCategory,
  } = analysisData;

  const totalOrderCount =
    orderSummary.completed + orderSummary.cancelled + orderSummary.noOrders;

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans" style={{ color: colors.darkText }}>
      <h1 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
        Analysis Dashboard - {storeName}
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <SummaryCard title="Total Sales" subtitle="Last 30 days" value={`₹ ${totalSales}`} bgColor={colors.primary} />
        <SummaryCard title="Vendor Rating" subtitle="Customer Reviews" value={`${vendorRating.toFixed(1)}/5`} bgColor={colors.primary} />
        <SummaryCard title="Total Orders" subtitle="Last 30 days" value={totalOrders} bgColor={colors.primary} />
        <SummaryCard title="Total Products" subtitle="All Categories" value={totalProducts} bgColor={colors.primary} />
      </div>

      {/* Order Summary */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
          Order Summary
        </h2>
        <div className="grid grid-cols-3 gap-4 max-w-md">
          <OrderStatusCard label="Completed" count={orderSummary.completed} total={totalOrderCount} bgColor={colors.successGreen} />
          <OrderStatusCard label="Cancelled" count={orderSummary.cancelled} total={totalOrderCount} bgColor={colors.accentOrange} />
          <OrderStatusCard label="No Orders" count={orderSummary.noOrders} total={totalOrderCount} bgColor="#A0AEC0" />
        </div>
      </section>

      {/* Products by Category Bars */}
      <section className="mb-10 max-w-xl">
        <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
          Products by Category
        </h2>
        <div className="space-y-3 mb-6">
          {productsByCategory.map(({ category, count }) => (
            <CategoryBar key={category} category={category} count={count} maxCount={24} barColor={colors.primary} />
          ))}
        </div>
      </section>

      {/* Bar Chart Visualization */}
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
          Product Category Distribution
        </h2>
        <div style={{ width: '100%', height: 300, backgroundColor: colors.lightBlue, borderRadius: 8, padding: 16 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productsByCategory}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              barCategoryGap="30%"
            >
              <XAxis dataKey="category" stroke={colors.darkText} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill={colors.primary} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

// Summary card component
function SummaryCard({ title, subtitle, value, bgColor }: { title: string; subtitle: string; value: string | number; bgColor: string }) {
  return (
    <MuiCard
      sx={{
        backgroundColor: bgColor,
        color: 'white',
        borderRadius: 3,
        boxShadow: 4,
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: 3,
      }}
    >
      <div style={{ fontSize: 14, opacity: 0.8 }}>{subtitle}</div>
      <div style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 'bold' }}>{value}</div>
    </MuiCard>
  );
}

// Order status card
function OrderStatusCard({ label, count, total, bgColor }: { label: string; count: number; total: number; bgColor: string }) {
  const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : '0';
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: 'white',
        borderRadius: 10,
        padding: '20px 15px',
        textAlign: 'center',
        fontWeight: '600',
        boxShadow: '0 2px 8px rgb(0 0 0 / 0.15)',
      }}
    >
      <div style={{ fontSize: 22 }}>{label}</div>
      <div style={{ fontSize: 32 }}>{count}</div>
      <div style={{ fontSize: 14, opacity: 0.9 }}>{percentage}%</div>
    </div>
  );
}

// Category bar component
function CategoryBar({ category, count, maxCount, barColor }: { category: string; count: number; maxCount: number; barColor: string }) {
  const widthPercent = (count / maxCount) * 100;
  return (
    <div>
      <div style={{ marginBottom: 6, fontWeight: '600' }}>
        {category}: {count}
      </div>
      <div
        style={{
          height: 12,
          backgroundColor: '#E2E8F0',
          borderRadius: 8,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div
          style={{
            width: `${widthPercent}%`,
            height: '100%',
            backgroundColor: barColor,
            borderRadius: 8,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
