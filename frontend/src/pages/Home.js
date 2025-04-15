import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Fade,
  Grow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Restaurant as RestaurantIcon,
  LocalShipping as DeliveryIcon,
  ShoppingCart as CartIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #FF4B2B 30%, #FF416C 90%)',
        backgroundSize: '200% 200%',
        animation: 'gradient 15s ease infinite',
        '@keyframes gradient': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  Welcome to Campus Cafeteria
                </Typography>
                <Typography
                  variant="h5"
                  paragraph
                  sx={{
                    color: 'white',
                    mb: 4,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                  }}
                >
                  Your one-stop destination for delicious meals on campus. Sign in to explore our menu and place your orders.
                </Typography>
                {!isAuthenticated && (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Grow in timeout={1500}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/login"
                        size="large"
                        sx={{
                          bgcolor: 'white',
                          color: '#FF416C',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.9)',
                          },
                        }}
                      >
                        Sign In
                      </Button>
                    </Grow>
                    <Grow in timeout={2000}>
                      <Button
                        variant="outlined"
                        component={RouterLink}
                        to="/register"
                        size="large"
                        sx={{
                          borderColor: 'white',
                          color: 'white',
                          '&:hover': {
                            borderColor: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)',
                          },
                        }}
                      >
                        Sign Up
                      </Button>
                    </Grow>
                  </Box>
                )}
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grow in timeout={2500}>
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#FF416C', fontWeight: 'bold' }}>
                  Why Choose Us?
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <RestaurantIcon sx={{ color: '#FF416C' }} />
                    </ListItemIcon>
                    <ListItemText primary="Fresh and delicious meals prepared daily" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DeliveryIcon sx={{ color: '#FF416C' }} />
                    </ListItemIcon>
                    <ListItemText primary="Quick and reliable delivery service" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CartIcon sx={{ color: '#FF416C' }} />
                    </ListItemIcon>
                    <ListItemText primary="Easy online ordering system" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon sx={{ color: '#FF416C' }} />
                    </ListItemIcon>
                    <ListItemText primary="Special discounts for students" />
                  </ListItem>
                </List>
              </Paper>
            </Grow>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 