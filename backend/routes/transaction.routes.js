const router = require('express').Router();
const { readData, writeData } = require('../services/data.service');

// Get all transactions
router.get('/', (req, res) => {
  try {
    const data = readData();
    console.log('Sending transactions:', data.transactions);
    res.json(data.transactions || []);
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({ message: 'Error retrieving transactions' });
  }
});

// Add new transaction
router.post('/', (req, res) => {
  try {
    console.log('Received transaction data:', req.body);
    const data = readData();
    
    // Validate required fields
    const { amount, category } = req.body;
    if (!amount || !category) {
      return res.status(400).json({ 
        message: 'Amount and category are required',
        received: req.body 
      });
    }

    // Create new transaction with all fields
    const newTransaction = {
      id: data.transactions.length > 0 
        ? Math.max(...data.transactions.map(t => Number(t.id))) + 1 
        : 1,
      amount: Number(amount),
      category: String(category),
      date: req.body.date || new Date().toISOString().split('T')[0],
      type: req.body.type || 'expense'
    };

    console.log('Created new transaction:', newTransaction);
    
    // Add to transactions array
    data.transactions.push(newTransaction);
    
    // Write updated data
    const success = writeData(data);
    console.log('Write success:', success);
    
    if (success) {
      res.status(201).json(newTransaction);
    } else {
      throw new Error('Failed to write data');
    }
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ 
      message: 'Error adding transaction',
      error: error.message 
    });
  }
});

// Update transaction
router.put('/:id', (req, res) => {
  try {
    console.log('Update transaction request:', { id: req.params.id, body: req.body });
    const data = readData();
    const id = Number(req.params.id);
    
    const index = data.transactions.findIndex(t => Number(t.id) === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Update only provided fields
    const updatedTransaction = {
      ...data.transactions[index],
      amount: req.body.amount ? Number(req.body.amount) : data.transactions[index].amount,
      category: req.body.category || data.transactions[index].category,
      date: req.body.date || data.transactions[index].date,
      type: req.body.type || data.transactions[index].type,
      id // Keep the same ID
    };

    console.log('Updated transaction:', updatedTransaction);
    
    // Update transaction in array
    data.transactions[index] = updatedTransaction;
    
    // Write updated data
    const success = writeData(data);
    console.log('Write success:', success);
    
    if (success) {
      res.json(updatedTransaction);
    } else {
      throw new Error('Failed to write data');
    }
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ 
      message: 'Error updating transaction',
      error: error.message 
    });
  }
});

// Delete transaction
router.delete('/:id', (req, res) => {
  try {
    console.log('Delete transaction request:', req.params.id);
    const data = readData();
    const id = Number(req.params.id);
    
    const index = data.transactions.findIndex(t => Number(t.id) === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Remove transaction from array
    data.transactions.splice(index, 1);
    
    // Write updated data
    const success = writeData(data);
    console.log('Write success:', success);
    
    if (success) {
      res.json({ message: 'Transaction deleted successfully' });
    } else {
      throw new Error('Failed to write data');
    }
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ 
      message: 'Error deleting transaction',
      error: error.message 
    });
  }
});

module.exports = router;
