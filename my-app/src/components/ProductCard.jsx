import React from 'react';
import styles from './ProductCard.module.css';

function ProductCard({ title, description, imageUrl }) { 
  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img 
          src={imageUrl} 
          alt={title} 
          className={styles.cardActualImage} 
        />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}

export default ProductCard;