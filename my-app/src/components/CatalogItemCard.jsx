import React from 'react';
import { Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';

import styles from './CatalogItemCard.module.css';
import cartIcon from '../assets/cartIcon.png';
import Button from './Button'; 
import { getImageUrl } from '../utils/imageHelper'; 

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
  
  const dispatch = useDispatch();
  const imageSource = getImageUrl(imageUrl);

  const handleAddToCart = (e) => {
    e.preventDefault(); 

    const product = { 
      id, title, brand, type, volume, price, imageUrl, madeIn, sex 
    };
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.card}>
      
      <button 
        className={styles.cartIcon} 
        onClick={handleAddToCart}
        title="Add to cart"
      >
        <img src={cartIcon} alt="Add to cart" />
      </button>

      <div className={styles.cardImageContainer}>
        <img 
          src={imageSource} 
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