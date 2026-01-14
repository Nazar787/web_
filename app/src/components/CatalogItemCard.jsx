import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './CatalogItemCard.module.css';
import cartIcon from '../assets/cartIcon.png';
import Button from './Button'; 

function CatalogItemCard({ 
  title, 
  brand,
  type,
  volume,
  price, 
  imageUrl,
  id,
  madeIn, 
  sex 
}) {
  
  return (
    <div className={styles.card}>
      
      <Link to={`/cart/add/${id}`} className={styles.cartIcon}>
        <img src={cartIcon} alt="Add to cart" />
      </Link>

      <div className={styles.cardImageContainer}>
        <img 
          src={imageUrl} 
          alt={title} 
          className={styles.cardActualImage} 
        />
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.cardBrand}>{brand}</p> 
        <h3 className={styles.cardTitle}>{title}</h3> 
        <p className={styles.cardType}>{type}</p>
        <p className={styles.cardVolume}>{volume}</p> 
        <p className={styles.cardPrice}>{price} $</p> 
      </div>

      <Link to={`/product/${id}`} className={styles.linkWrapper}>
        <Button>
          View more
        </Button>
      </Link>
    </div>
  );
}

export default CatalogItemCard;