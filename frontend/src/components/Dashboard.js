import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line, Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const Dashboard = () => {
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

  // Calculate total expenses
  const totalExpenses = transactions.reduce((total, transaction) => 
    total + (transaction.type === 'expense' ? transaction.amount : 0), 0);

  // Calculate total income
  const totalIncome = transactions.reduce((total, transaction) => 
    total + (transaction.type === 'income' ? transaction.amount : 0), 0);

  // Calculate budget utilization
  const budgetUtilization = budgets.map(budget => ({
    category: budget.category,
    percentage: (budget.spent / budget.budget) * 100
  }));

  // Prepare data for line chart
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Expenses',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Prepare data for doughnut chart
  const doughnutChartData = {
    labels: budgets.map(budget => budget.category),
    datasets: [
      {
        data: budgets.map(budget => budget.spent),
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

  return (
    <Container>
      <h2 className="my-4">Dashboard</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Total Expenses</Card.Title>
              <Card.Text className="h3 text-danger">₹{totalExpenses}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Total Income</Card.Title>
              <Card.Text className="h3 text-success">₹{totalIncome}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Expense Trend</Card.Title>
              <Line data={lineChartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Budget Distribution</Card.Title>
              <Doughnut data={doughnutChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Budget Utilization</Card.Title>
              {budgetUtilization.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span>{item.category}</span>
                    <span>{item.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${item.percentage}%` }}
                      aria-valuenow={item.percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
