import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, ProgressBar } from 'react-bootstrap';
import axios from 'axios';

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    budget: '',
    spent: ''
  });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/budgets');
      setBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setNewBudget({ category: '', budget: '', spent: '' });
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget({ ...newBudget, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/budgets', {
        ...newBudget,
        budget: parseFloat(newBudget.budget),
        spent: parseFloat(newBudget.spent)
      });
      handleClose();
      fetchBudgets();
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/budgets/${id}`);
      fetchBudgets();
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Budgets</h2>
        <Button variant="primary" onClick={handleShow}>
          Add New Budget
        </Button>
      </div>

      <Row>
        {budgets.map((budget) => (
          <Col key={budget.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{budget.category}</Card.Title>
                <Card.Text>
                  Budget: ₹{budget.budget}<br />
                  Spent: ₹{budget.spent}
                </Card.Text>
                <ProgressBar 
                  now={(budget.spent / budget.budget) * 100} 
                  label={`${Math.round((budget.spent / budget.budget) * 100)}%`}
                  variant={
                    (budget.spent / budget.budget) * 100 > 90 ? 'danger' :
                    (budget.spent / budget.budget) * 100 > 75 ? 'warning' : 'success'
                  }
                />
                <Button 
                  variant="danger" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => handleDelete(budget.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={newBudget.category}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Budget Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                name="budget"
                value={newBudget.budget}
                onChange={handleInputChange}
                required
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Initial Spent Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                name="spent"
                value={newBudget.spent}
                onChange={handleInputChange}
                required
                min="0"
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Budget
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BudgetsPage;