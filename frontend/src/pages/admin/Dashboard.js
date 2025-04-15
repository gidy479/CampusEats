import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { fetchOrders } from '../../redux/slices/orderSlice';
import { fetchMenuItems } from '../../redux/slices/menuSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading: ordersLoading } = useSelector((state) => state.order);
  const { items: menuItems, loading: menuLoading } = useSelector((state) => state.menu);

  useEffect(() => {
    if (user && user.role === 'admin') {
      dispatch(fetchOrders());
      dispatch(fetchMenuItems());
    }
  }, [dispatch, user]);

  if (!user || user.role !== 'admin') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Access denied. Admin privileges required.</Alert>
      </Container>
    );
  }

  if (ordersLoading || menuLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(order => order.status === 'pending').length,
    totalMenuItems: menuItems.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/admin/menu')}
            sx={{ mr: 2 }}
          >
            Manage Menu
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/admin/orders')}
          >
            Manage Orders
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <ShoppingCartIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6">{stats.totalOrders}</Typography>
                  <Typography color="textSecondary">Total Orders</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <RestaurantIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6">{stats.totalMenuItems}</Typography>
                  <Typography color="textSecondary">Menu Items</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PeopleIcon color="info" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6">{stats.pendingOrders}</Typography>
                  <Typography color="textSecondary">Pending Orders</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <MoneyIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6">
                    ${stats.totalRevenue.toFixed(2)}
                  </Typography>
                  <Typography color="textSecondary">Total Revenue</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              {orders.slice(0, 5).map((order) => (
                <Box
                  key={order.id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={1}
                  borderBottom="1px solid #eee"
                >
                  <Box>
                    <Typography>Order #{order.id}</Typography>
                    <Typography color="textSecondary" variant="body2">
                      {new Date(order.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="h6">
                      ${order.totalAmount.toFixed(2)}
                    </Typography>
                    <Typography
                      color={
                        order.status === 'pending'
                          ? 'warning.main'
                          : order.status === 'completed'
                          ? 'success.main'
                          : 'textSecondary'
                      }
                      variant="body2"
                    >
                      {order.status}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 