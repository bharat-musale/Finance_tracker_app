import React, { useState } from 'react';

const TransactionList = ({ transactions, onAdd, onEdit, onDelete }) => {
  const [filters, setFilters] = useState({ date: '', category: '', amount: '' });

  // Filter transactions based on user input
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesDate = filters.date ? transaction.date.includes(filters.date) : true;
    const matchesCategory = filters.category
      ? transaction.category.toLowerCase().includes(filters.category.toLowerCase())
      : true;
    const matchesAmount = filters.amount ? transaction.amount === Number(filters.amount) : true;

    return matchesDate && matchesCategory && matchesAmount;
  });

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Transactions</h2>

      {/* Filter Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="date"
          name="date"
          className="p-2 border border-gray-300 rounded"
          placeholder="Filter by date"
          value={filters.date}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="category"
          className="p-2 border border-gray-300 rounded"
          placeholder="Filter by category"
          value={filters.category}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="amount"
          className="p-2 border border-gray-300 rounded"
          placeholder="Filter by amount"
          value={filters.amount}
          onChange={handleFilterChange}
        />
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-200 text-left">
                Date
              </th>
              <th className="px-4 py-2 border border-gray-200 text-left">
                Category
              </th>
              <th className="px-4 py-2 border border-gray-200 text-right">
                Amount
              </th>
              <th className="px-4 py-2 border border-gray-200 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-200">
                  {transaction.date}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {transaction.category}
                </td>
                <td className="px-4 py-2 border border-gray-200 text-right">{`₹${transaction.amount}`}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Transaction Button */}
      <div className="mt-4">
        <button
          onClick={onAdd}
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
        >
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default TransactionList;
