import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions'; // Перевір шлях до actions!
import styles from './ProductCard.module.css';

// Тепер ми приймаємо весь об'єкт 'product', щоб мати доступ до ID та ціни
function ProductCard({ product }) { 
  const dispatch = useDispatch();
  
  // Стан для об'єму (50 або 100)
  const [volume, setVolume] = useState(50);

  // Логіка ціни: якщо 100 мл — множимо ціну на 2
  const currentPrice = volume === 50 ? product.price : product.price * 2;

  const handleAddToCart = () => {
    dispatch(addToCart(product, volume, currentPrice));
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img 
          src={product.image} // Зверни увагу: поле в БД має називатися 'image'
          alt={product.title} 
          className={styles.cardActualImage} 
        />
      </div>
      
      <h3 className={styles.cardTitle}>{product.title}</h3>
      <p className={styles.cardDescription}>{product.description}</p>
      
      {/* Блок ціни та кнопок */}
      <div className={styles.controls}>
        <div className={styles.priceTag}>
            {currentPrice} грн
        </div>

        <div className={styles.volumeButtons}>
            <button 
                className={volume === 50 ? styles.activeBtn : styles.btn}
                onClick={() => setVolume(50)}
            >
                50 мл
            </button>
            <button 
                className={volume === 100 ? styles.activeBtn : styles.btn}
                onClick={() => setVolume(100)}
            >
                100 мл
            </button>
        </div>

        <button className={styles.buyBtn} onClick={handleAddToCart}>
            В кошик
        </button>
      </div>
    </div>
  );
}

export default ProductCard;