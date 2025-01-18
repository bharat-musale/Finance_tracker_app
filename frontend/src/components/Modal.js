import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      date: '',
      category: '',
      amount: '',
    }
  );

  if (!isOpen) return null;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {initialData ? 'Edit Transaction' : 'Add Transaction'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Date Input */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-600">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          {/* Category Input */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Groceries"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g., 100"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
