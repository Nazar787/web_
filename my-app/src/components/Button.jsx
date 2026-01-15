import React from 'react';
import styles from './Button.module.css';

function Button({ children, onClick, className, type = "button", ...rest }) { 
  
  return (
    <button 
      type={type} 
      className={`${styles.myButton} ${className || ''}`} 
      onClick={onClick}
      {...rest} 
    >
      {children}
    </button>
  );
}

export default Button;