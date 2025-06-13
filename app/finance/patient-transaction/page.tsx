"use client";

import React, { useState, useMemo } from "react";

const FinancePage = () => {
  const transactions = [
    { date: "2025-06-01", patient: "Anita Sharma", service: "General Consultation", amount: 320, status: "Paid" },
    { date: "2025-06-02", patient: "Rahul Chaudhary", service: "Blood Test", amount: 450, status: "Pending" },
    { date: "2025-06-03", patient: "Sita Thapa", service: "X-Ray", amount: 600, status: "Paid" },
    { date: "2025-06-04", patient: "Bibek Karki", service: "Pharmacy Purchase", amount: 150, status: "Unpaid" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.service.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "All" || tx.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalIncome = filteredTransactions
    .filter((tx) => tx.status === "Paid")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const statusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "text-green-600 font-semibold";
      case "Pending":
        return "text-yellow-600 font-semibold";
      case "Unpaid":
        return "text-red-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#0077B6] mb-4">Finance - Transactions</h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search patient or service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="All">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      {/* Total Income */}
      <div className="mb-4 text-lg text-green-700 font-semibold">
        Total Income from Paid Transactions: ${totalIncome}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-[#01579b] text-[#fafafa]">
            <tr>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Patient</th>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{tx.date}</td>
                <td className="py-3 px-4">{tx.patient}</td>
                <td className="py-3 px-4">{tx.service}</td>
                <td className="py-3 px-4">${tx.amount}</td>
                <td className={`py-3 px-4 ${statusColor(tx.status)}`}>{tx.status}</td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancePage;
