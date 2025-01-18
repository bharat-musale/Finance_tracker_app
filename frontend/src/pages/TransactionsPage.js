import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionList from '../components/TransactionList';
import Modal from '../components/Modal';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Open modal for adding or editing
  const openModal = (transaction = null) => {
    setCurrentTransaction(transaction);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentTransaction(null);
  };

  // Save new or edited transaction
  const handleSaveTransaction = async (transaction) => {
    try {
      if (currentTransaction) {
        await axios.put(`http://localhost:5000/api/transactions/${currentTransaction.id}`, transaction);
      } else {
        await axios.post('http://localhost:5000/api/transactions', transaction);
      }
      fetchTransactions();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
    closeModal();
  };

  // Delete a transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Transactions</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Transaction
        </button>
      </div>

      {/* Transactions List */}
      <TransactionList
        transactions={transactions}
        onEdit={openModal}
        onDelete={handleDeleteTransaction}
      />

      {/* Modal for Adding/Editing Transactions */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveTransaction}
          initialData={currentTransaction}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
