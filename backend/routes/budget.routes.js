const router = require('express').Router();
const { readData, writeData } = require('../services/data.service');

// Get all budgets
router.get('/', (req, res) => {
  try {
    const data = readData();
    console.log('Sending budgets:', data.budgets);
    res.json(data.budgets || []);
  } catch (error) {
    console.error('Error getting budgets:', error);
    res.status(500).json({ message: 'Error retrieving budgets' });
  }
});

// Add new budget
router.post('/', (req, res) => {
  try {
    console.log('Received budget data:', req.body);
    const data = readData();
    
    // Validate required fields
    const { category, budget } = req.body;
    if (!category || !budget) {
      return res.status(400).json({ 
        message: 'Category and budget amount are required',
        received: req.body 
      });
    }

    // Create new budget with all fields
    const newBudget = {
      id: data.budgets.length > 0 
        ? Math.max(...data.budgets.map(b => Number(b.id))) + 1 
        : 1,
      category: String(category),
      budget: Number(budget),
      spent: req.body.spent ? Number(req.body.spent) : 0
    };

    console.log('Created new budget:', newBudget);
    
    // Add to budgets array
    data.budgets.push(newBudget);
    
    // Write updated data
    const success = writeData(data);
    console.log('Write success:', success);
    
    if (success) {
      res.status(201).json(newBudget);
    } else {
      throw new Error('Failed to write data');
    }
  } catch (error) {
    console.error('Error adding budget:', error);
    res.status(500).json({ 
      message: 'Error adding budget',
      error: error.message 
    });
  }
});

// Update budget
router.put('/:id', (req, res) => {
  try {
    console.log('Update budget request:', { id: req.params.id, body: req.body });
    const data = readData();
    const id = Number(req.params.id);
    
    const index = data.budgets.findIndex(b => Number(b.id) === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Update only provided fields
    const updatedBudget = {
      ...data.budgets[index],
      category: req.body.category || data.budgets[index].category,
      budget: req.body.budget ? Number(req.body.budget) : data.budgets[index].budget,
      spent: req.body.spent !== undefined ? Number(req.body.spent) : data.budgets[index].spent,
      id // Keep the same ID
    };

    console.log('Updated budget:', updatedBudget);
    
    // Update budget in array
    data.budgets[index] = updatedBudget;
    
    // Write updated data
    const success = writeData(data);
    console.log('Write success:', success);
    
    if (success) {
      res.json(updatedBudget);
    } else {
      throw new Error('Failed to write data');
    }
  } catch (error) {
    console.error('Error updating budget:', error);
    res.status(500).json({ 
      message: 'Error updating budget',
      error: error.message 
    });
  }
});

// Delete budget
router.delete('/:id', (req, res) => {
  try {
    console.log('Delete budget request:', req.params.id);
    const data = readData();
    const id = Number(req.params.id);
    
    const index = data.budgets.findIndex(b => Number(b.id) === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Remove budget from array
    data.budgets.splice(index, 1);
    
    // Write updated data
    const success = writeData(data);
    console.log('Write success:', success);
    
    if (success) {
      res.json({ message: 'Budget deleted successfully' });
    } else {
      throw new Error('Failed to write data');
    }
  } catch (error) {
    console.error('Error deleting budget:', error);
    res.status(500).json({ 
      message: 'Error deleting budget',
      error: error.message 
    });
  }
});

module.exports = router;
