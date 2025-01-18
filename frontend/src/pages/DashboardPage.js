import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Dashboard from '../components/Dashboard';
import Chart from '../components/Chart';
import BudgetProgressBar from '../components/BudgetProgressBar';
import axios from 'axios';

const DashboardPage = () => {
  const [budgetData, setBudgetData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, budgetsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/transactions'),
          axios.get('http://localhost:5000/api/budgets')
        ]);
        setBudgetData(budgetsRes.data);
        setTransactionData(transactionsRes.data);

        // Calculate total income and expenses based on transactions
        const totalIncome = transactionsRes.data
          .filter((t) => t.category === 'Income')
          .reduce((acc, t) => acc + t.amount, 0);
        const totalExpenses = transactionsRes.data
          .filter((t) => t.category !== 'Income')
          .reduce((acc, t) => acc + t.amount, 0);
        setIncome(totalIncome);
        setExpenses(totalExpenses);
        setSavings(totalIncome - totalExpenses); // Simple savings calculation
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Prepare data for Pie Chart (Expense Categories)
  const pieChartData = {
    labels: transactionData
      .reduce((categories, transaction) => {
        if (
          !categories.includes(transaction.category) &&
          transaction.category !== 'Income'
        ) {
          categories.push(transaction.category);
        }
        return categories;
      }, []),
    datasets: [
      {
        data: transactionData
          .reduce((amounts, transaction) => {
            if (transaction.category !== 'Income') {
              const index = amounts.findIndex(
                (item) => item.category === transaction.category
              );
              if (index === -1) {
                amounts.push({
                  category: transaction.category,
                  amount: transaction.amount,
                });
              } else {
                amounts[index].amount += transaction.amount;
              }
            }
            return amounts;
          }, [])
          .map((item) => item.amount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  // Prepare data for Line Chart (Monthly Trends)
  const months = ['January', 'February', 'March', 'April', 'May', 'June'];
  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [1200, 1500, 1100, 1800, 1400, 1700], // Example data for monthly trends
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Expenses Trend' },
    },
  };

  return (
    <Container>
      {/* Dashboard Summary */}
      <Dashboard
        income={income}
        expenses={expenses}
        savings={savings}
        transactions={transactionData}
      />

      {/* Charts Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart for Expense Categories */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Expenses by Category
          </h2>
          <Chart type="pie" data={pieChartData} />
        </div>

        {/* Line Chart for Monthly Expenses */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Monthly Expense Trends
          </h2>
          <Chart type="line" data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Budget Progress Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Budgets Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetData.map((budget) => (
            <BudgetProgressBar
              key={budget.id}
              category={budget.category}
              budget={budget.budget}
              spent={budget.spent}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default DashboardPage;
