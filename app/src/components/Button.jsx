import React from 'react';
import styles from './Button.module.css';

function Button({ children, onClick, className }) {
  
  return (
    <button 
      type="button" 
      className={`${styles.myButton} ${className || ''}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;