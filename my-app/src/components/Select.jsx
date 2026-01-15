import React from 'react';
import styles from './Select.module.css';

function Select({ label, name, options, value, onChange, wrapperClassName }) {
  
  return (
    <div className={`${styles.selectWrapper} ${wrapperClassName || ''}`}>
      
      <label htmlFor={name} className={styles.selectLabel}>
        {label}
      </label>
      
      <select 
        name={name} 
        id={name} 
        className={styles.selectElement}
        value={value}
        onChange={onChange}
      >
        
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
          >
            {option.label}
          </option>
        ))}
        
      </select>
    </div>
  );
}

export default Select;