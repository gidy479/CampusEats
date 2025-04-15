import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';

const Payment = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    momoNumber: '',
    momoName: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    return {
      subtotal,
      tax,
      total: subtotal + tax,
    };
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: 'Payment processed successfully!',
      });
      // Navigate to order confirmation page after successful payment
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    }, 2000);
  };

  const paymentOptions = [
    {
      value: 'momo',
      label: 'MoMo',
      icon: <PhoneAndroidIcon sx={{ fontSize: 30, color: '#E74C3C' }} />,
      description: 'Pay using your MoMo account',
    },
    {
      value: 'credit',
      label: 'Credit Card',
      icon: <CreditCardIcon sx={{ fontSize: 30, color: '#E74C3C' }} />,
      description: 'Pay using your credit card',
    },
    {
      value: 'debit',
      label: 'Debit Card',
      icon: <AccountBalanceIcon sx={{ fontSize: 30, color: '#E74C3C' }} />,
      description: 'Pay using your debit card',
    },
  ];

  if (isProcessing) {
    return <Loading message="Processing your payment..." />;
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            animation: 'slideIn 0.5s ease-out forwards'
          }}
          className="slide-in"
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#7F8C8D',
              mb: 2
            }}
          >
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/menu')}
            sx={{ 
              backgroundColor: '#E74C3C',
              '&:hover': {
                backgroundColor: '#CB4335',
              },
            }}
          >
            Browse Menu
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          animation: 'fadeIn 0.6s ease-out forwards'
        }}
        className="fade-in"
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: '#2C3E50',
            fontWeight: 600,
            mb: 2
          }}
        >
          Payment
        </Typography>
        <Typography 
          variant="h6"
          sx={{ 
            color: '#7F8C8D',
            fontWeight: 400
          }}
        >
          Choose your preferred payment method
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4,
              animation: 'slideIn 0.5s ease-out forwards'
            }}
            className="slide-in"
          >
            <FormControl component="fieldset" sx={{ width: '100%', mb: 4 }}>
              <FormLabel 
                component="legend"
                sx={{ 
                  color: '#2C3E50',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                Select Payment Method
              </FormLabel>
              <RadioGroup
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <Grid container spacing={2}>
                  {paymentOptions.map((option) => (
                    <Grid item xs={12} sm={4} key={option.value}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                          },
                          border: paymentMethod === option.value ? '2px solid #E74C3C' : 'none',
                        }}
                        onClick={() => setPaymentMethod(option.value)}
                      >
                        <Box sx={{ mb: 1 }}>{option.icon}</Box>
                        <FormControlLabel
                          value={option.value}
                          control={<Radio sx={{ color: '#E74C3C' }} />}
                          label={option.label}
                          sx={{ mb: 1 }}
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#7F8C8D',
                            textAlign: 'center'
                          }}
                        >
                          {option.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>

            <Divider sx={{ my: 4 }} />

            {status.message && (
              <Alert 
                severity={status.type} 
                sx={{ 
                  mb: 3,
                  animation: 'scaleIn 0.4s ease-out forwards'
                }}
                className="scale-in"
              >
                {status.message}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              {paymentMethod === 'momo' ? (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="MoMo Number"
                      name="momoNumber"
                      value={formData.momoNumber}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#E74C3C',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name on MoMo Account"
                      name="momoName"
                      value={formData.momoName}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#E74C3C',
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#E74C3C',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name on Card"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#E74C3C',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date (MM/YY)"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#E74C3C',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#E74C3C',
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ 
                  mt: 4,
                  backgroundColor: '#E74C3C',
                  '&:hover': {
                    backgroundColor: '#CB4335',
                  },
                }}
              >
                Process Payment
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              animation: 'slideIn 0.5s ease-out forwards'
            }}
            className="slide-in"
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: '#2C3E50',
                fontWeight: 600
              }}
            >
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                Subtotal: ${calculateTotal().subtotal.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Tax (10%): ${calculateTotal().tax.toFixed(2)}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mt: 2,
                  color: '#E74C3C',
                  fontWeight: 600
                }}
              >
                Total: ${calculateTotal().total.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Payment; 