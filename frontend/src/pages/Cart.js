import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { orderService } from '../services/api';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.menuItem._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.menuItem._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    if (!deliveryAddress) {
      setError('Please provide a delivery address');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const orderData = {
        items: cartItems.map((item) => ({
          menuItem: item.menuItem._id,
          quantity: item.quantity,
          price: item.menuItem.price,
        })),
        totalAmount: calculateTotal(),
        deliveryAddress,
        specialInstructions,
      };

      const response = await orderService.create(orderData);
      if (response.success) {
        // Clear cart
        localStorage.removeItem('cart');
        setCartItems([]);
        // Navigate to payment page
        navigate(`/payment/${response.data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/menu')}
          >
            Browse Menu
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shopping Cart
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Paper sx={{ p: 2, mb: 2 }}>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.menuItem._id}>
                <ListItemText
                  primary={item.menuItem.name}
                  secondary={`$${item.menuItem.price.toFixed(2)}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <Button
                    size="small"
                    onClick={() => handleUpdateQuantity(item.menuItem._id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <TextField
                    size="small"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.menuItem._id, parseInt(e.target.value) || 0)
                    }
                    inputProps={{ min: 1, style: { textAlign: 'center' } }}
                    sx={{ width: '60px', mx: 1 }}
                  />
                  <Button
                    size="small"
                    onClick={() => handleUpdateQuantity(item.menuItem._id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </Box>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveItem(item.menuItem._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Delivery Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Special Instructions"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            margin="normal"
            multiline
            rows={2}
          />
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Total: ${calculateTotal().toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            disabled={loading || !deliveryAddress}
          >
            {loading ? <CircularProgress size={24} /> : 'Proceed to Checkout'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart; 