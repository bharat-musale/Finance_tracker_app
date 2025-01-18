import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Line, Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';

const ReportsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, budgetsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/transactions'),
          axios.get('http://localhost:5000/api/budgets')
        ]);
        setTransactions(transactionsRes.data);
        setBudgets(budgetsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate monthly expenses
  const monthlyExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // Calculate category-wise expenses
  const categoryExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // Calculate budget vs actual spending
  const budgetComparison = budgets.map(budget => ({
    category: budget.category,
    budget: budget.budget,
    spent: budget.spent
  }));

  // Chart data for monthly expenses
  const monthlyExpensesData = {
    labels: Object.keys(monthlyExpenses),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(monthlyExpenses),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Chart data for category expenses
  const categoryExpensesData = {
    labels: Object.keys(categoryExpenses),
    datasets: [
      {
        data: Object.values(categoryExpenses),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  // Chart data for budget comparison
  const budgetComparisonData = {
    labels: budgetComparison.map(item => item.category),
    datasets: [
      {
        label: 'Budget',
        data: budgetComparison.map(item => item.budget),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Spent',
        data: budgetComparison.map(item => item.spent),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Container>
      <h2 className="my-4">Financial Reports</h2>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Monthly Expenses Trend</Card.Title>
              <Line data={monthlyExpensesData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Expense Distribution by Category</Card.Title>
              <Pie data={categoryExpensesData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Budget vs Actual Spending</Card.Title>
              <Bar data={budgetComparisonData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportsPage;
