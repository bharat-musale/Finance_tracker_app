# Finance Tracker Backend

A Node.js-based RESTful API service that manages financial data for the Finance Manager application.

## Features

- **Data Management**: JSON-based data storage
- **RESTful APIs**: Endpoints for transactions and budgets
- **Error Handling**: Comprehensive error handling and validation
- **Logging**: Request logging for debugging

## Tech Stack

- Node.js
- Express.js
- Morgan for logging
- CORS for cross-origin resource sharing
- dotenv for environment variables

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with the following content:
   ```
   PORT=5000
   ```

## Running the Server

1. Start the server:
   ```bash
   npm start
   ```
2. The server will run on [http://localhost:5000](http://localhost:5000)

## Project Structure

```
backend/
├── data/
│   └── data.json         # JSON file for data storage
├── middleware/
│   └── auth.js           # Authentication middleware
├── routes/
│   ├── transaction.routes.js
│   └── budget.routes.js
├── services/
│   └── data.service.js   # Data management service
├── server.js            # Main application file
└── package.json         # Project dependencies and scripts
```

## API Endpoints

### Transactions

#### GET /api/transactions
- Get all transactions
- Response: Array of transaction objects
```json
[
  {
    "id": 1,
    "date": "2025-01-10",
    "category": "Groceries",
    "amount": 500,
    "type": "expense"
  }
]
```

#### POST /api/transactions
- Create a new transaction
- Request body:
```json
{
  "date": "2025-01-10",
  "category": "Groceries",
  "amount": 500,
  "type": "expense"
}
```

#### DELETE /api/transactions/:id
- Delete a transaction by ID

### Budgets

#### GET /api/budgets
- Get all budgets
- Response: Array of budget objects
```json
[
  {
    "id": 1,
    "category": "Groceries",
    "budget": 1000,
    "spent": 500
  }
]
```

#### POST /api/budgets
- Create a new budget
- Request body:
```json
{
  "category": "Groceries",
  "budget": 1000,
  "spent": 0
}
```

#### DELETE /api/budgets/:id
- Delete a budget by ID

## Data Storage

The application uses a JSON file (`data/data.json`) for data persistence. The file structure is:

```json
{
  "transactions": [],
  "budgets": []
}
```

## Error Handling

The API includes error handling for:
- Invalid requests
- Missing data
- Server errors
- File operations

## Logging

Morgan middleware is used for HTTP request logging, helping with:
- Debugging
- Request monitoring
- Performance tracking

## Security

- CORS enabled for frontend access
- Input validation
- Error message sanitization


