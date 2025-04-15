import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PaymentIcon from '@mui/icons-material/Payment';

const About = () => {
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
    {
      icon: <AccessTimeIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: '24/7 Availability',
      description: 'Order anytime, anywhere on campus',
    },
    {
      icon: <DeliveryDiningIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: 'Fast Delivery',
      description: 'Quick delivery to your location',
    },
    {
      icon: <PaymentIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: 'Secure Payments',
      description: 'Safe and secure payment options',
    },
  ];

  return (
    <Container>
      <Box sx={{ my: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 'bold',
            mb: 4,
            animation: 'fadeIn 1s ease-in',
          }}
        >
          About Campus Cafeteria
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
          sx={{
            mb: 6,
            animation: 'fadeIn 1s ease-in 0.2s',
          }}
        >
          Your one-stop solution for delicious campus dining
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                  animation: `fadeIn 0.5s ease-in ${index * 0.2}s`,
                }}
              >
                {feature.icon}
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom align="center">
            Our Story
          </Typography>
          <Typography
            variant="body1"
            paragraph
            align="center"
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            Campus Cafeteria was founded with a simple mission: to provide students,
            faculty, and staff with convenient access to delicious, affordable meals
            on campus. We understand the busy schedules of campus life and strive to
            make dining as seamless as possible.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            align="center"
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            Our team of experienced chefs and staff work tirelessly to ensure that
            every meal meets our high standards of quality and taste. We source
            fresh ingredients locally whenever possible and are committed to
            sustainable practices in our operations.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default About; 