import React from 'react';

const BudgetProgressBar = ({ category, budget, spent }) => {
  const progressPercentage = Math.min((spent / budget) * 100, 100); // Cap at 100%

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-700">{category}</h3>
        <span
          className={`text-sm font-medium ${
            progressPercentage >= 100 ? "text-red-500" : "text-gray-500"
          }`}
        >
          {`₹${spent} / ₹${budget}`}
        </span>
      </div>
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            progressPercentage >= 100 ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetProgressBar;
