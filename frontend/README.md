# Finance Tracker Frontend

A modern React-based financial management application that helps users track their expenses, manage budgets, and visualize financial data.

## Features

- **Dashboard**: Overview of financial status including total income, expenses, and savings
- **Transactions**: Add, view, and manage financial transactions
- **Budgets**: Create and track budgets by category with progress visualization
- **Reports**: Visual representation of financial data through charts and graphs

## Tech Stack

- React.js
- React Router for navigation
- React Bootstrap for UI components
- Axios for API communication
- Chart.js for data visualization
- Bootstrap for styling

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Dashboard.js
│   │   ├── Header.js
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── DashboardPage.js
│   │   ├── TransactionsPage.js
│   │   ├── BudgetsPage.js
│   │   └── ReportsPage.js
│   ├── App.js            # Main application component
│   └── index.js          # Application entry point
└── package.json          # Project dependencies and scripts
```

## Features in Detail

### Dashboard
- Total Income/Expense Overview
- Recent Transactions
- Budget Progress
- Expense Distribution Chart

### Transactions
- Add New Transactions
- View Transaction History
- Filter and Sort Transactions
- Delete Transactions

### Budgets
- Create New Budgets
- Set Budget Limits
- Track Spending Progress
- Visual Progress Bars
- Delete Budgets

### Reports
- Monthly Expense Trends
- Category-wise Expense Distribution
- Budget vs Actual Comparison
- Interactive Charts

## API Integration

The frontend communicates with the backend through RESTful APIs:

- GET `/api/transactions` - Fetch all transactions
- POST `/api/transactions` - Create new transaction
- DELETE `/api/transactions/:id` - Delete transaction
- GET `/api/budgets` - Fetch all budgets
- POST `/api/budgets` - Create new budget
- DELETE `/api/budgets/:id` - Delete budget


