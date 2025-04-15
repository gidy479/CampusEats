import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ variant = 'full', message = 'Loading...' }) => {
  const variants = {
    full: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 9999,
    },
    inline: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
    },
  };

  return (
    <Box sx={variants[variant]}>
      <CircularProgress 
        size={variant === 'button' ? 20 : 40} 
        sx={{ 
          color: '#E74C3C',
          animation: 'spin 1s linear infinite',
        }} 
      />
      {variant !== 'button' && (
        <Typography 
          variant="body1" 
          sx={{ 
            mt: 2,
            color: '#2C3E50',
            animation: 'fadeIn 0.5s ease-out forwards',
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loading; 