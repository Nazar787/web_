import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'; 
import styles from './SuccessPage.module.css'; 

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <span style={{ fontSize: '80px', color: '#0cc212ff' }}>✓</span>
      </div>
      <h1 className={styles.success}>Success!</h1>
      <div className={styles.description}>
        <p>Your order was sent to processing!</p>
        <p>Check your email box for further information.</p>
      </div>
      <Button onClick={() => navigate('/catalog')} className={styles.backButton}>
        Go back to Catalog
      </Button>
    </div>
  );
}

export default SuccessPage;