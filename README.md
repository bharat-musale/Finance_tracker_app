

# Finance Tracker Application

A complete solution to manage your finances with features for tracking expenses, managing budgets, and visualizing financial data through interactive charts and reports.

---

## Table of Contents

1. [Frontend](#finance-tracker-frontend)
   - Features
   - Tech Stack
   - Prerequisites
   - Installation
   - Running the Application
   - Project Structure
   - Features in Detail
   - API Integration
2. [Backend](#finance-tracker-backend)
   - Features
   - Tech Stack
   - Prerequisites
   - Installation
   - Running the Server
   - Project Structure
   - API Endpoints
   - Data Storage
   - Error Handling
   - Logging
   - Security

---

## Finance Manager Frontend

### Features
- **Dashboard**: Summary of income, expenses, and savings.
- **Transactions**: Add, view, and manage transactions.
- **Budgets**: Set and track monthly budgets with progress indicators.
- **Reports**: Graphical representation of financial data based on user-selected timeframes.

### Tech Stack
- React.js
- React Router for navigation
- React Bootstrap for UI components
- Axios for API communication
- Chart.js for data visualization
- Bootstrap for styling

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository.
2. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Structure
```
frontend/
├── public/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/             # Page components
│   ├── App.js             # Main application component
│   └── index.js           # Application entry point
└── package.json           # Project dependencies and scripts
```

### Features in Detail
#### Dashboard
- Display key financial metrics and charts for an at-a-glance overview.
#### Transactions
- Add, edit, and delete transactions with filters for better organization.
#### Budgets
- Set spending limits and visualize progress.
#### Reports
- Generate detailed financial insights with graphs and charts.

### API Integration
The frontend communicates with the backend via RESTful APIs (detailed below).

---

## Finance Manager Backend

### Features
- **Data Management**: Manage financial data for transactions and budgets.
- **RESTful APIs**: Endpoints to handle CRUD operations.
- **Logging**: Morgan middleware for request logging.

### Tech Stack
- Node.js
- Express.js
- Morgan for logging
- CORS for cross-origin requests

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository.
2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with the following content:
   ```plaintext
   PORT=5000
   ```

### Running the Server
1. Start the server:
   ```bash
   npm start
   ```
2. The server will run on [http://localhost:5000](http://localhost:5000).

### Project Structure
```
backend/
├── data/
│   └── data.json         # JSON file for data storage
├── routes/
│   ├── transaction.routes.js
│   └── budget.routes.js
├── server.js             # Main application file
└── package.json          # Project dependencies and scripts
```

### API Endpoints
#### Transactions
- **GET /api/transactions**: Fetch all transactions.
- **POST /api/transactions**: Add a new transaction.
- **DELETE /api/transactions/:id**: Delete a transaction by ID.

#### Budgets
- **GET /api/budgets**: Fetch all budgets.
- **POST /api/budgets**: Add a new budget.
- **DELETE /api/budgets/:id**: Delete a budget by ID.

### Data Storage
Data is stored in `data/data.json`:
```json
{
  "transactions": [],
  "budgets": []
}
```

### Error Handling
- Invalid input handling.
- Comprehensive error responses for API calls.

### Logging
- Morgan middleware for real-time HTTP request logs.

### Security
- CORS enabled for frontend access.
- Basic input validation.

