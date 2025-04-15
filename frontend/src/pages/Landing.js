import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const Landing = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <RestaurantIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: 'Diverse Menu',
      description: 'Explore our wide range of delicious meals and beverages',
    },
    {
      icon: <LocalCafeIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: 'Quick Service',
      description: 'Fast and efficient ordering and delivery system',
    },
    {
      icon: <FastfoodIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: 'Easy Ordering',
      description: 'Simple and intuitive ordering process',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: 'white',
        py: 8,
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 2,
                animation: 'fadeIn 1s ease-in',
              }}
            >
              Welcome to Campus Cafeteria
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mb: 4,
                animation: 'fadeIn 1s ease-in 0.2s',
              }}
            >
              Your one-stop solution for delicious campus dining
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                animation: 'fadeIn 1s ease-in 0.4s',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                }}
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                animation: 'scaleIn 0.5s ease-out',
              }}
            >
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        animation: `fadeIn 0.5s ease-in ${index * 0.2}s`,
                      }}
                    >
                      {feature.icon}
                      <Typography
                        variant="h6"
                        sx={{ mt: 2, mb: 1, color: 'white' }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing; 