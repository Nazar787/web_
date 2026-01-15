import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
      {message}
    </div>
  );
};

export default ErrorMessage;