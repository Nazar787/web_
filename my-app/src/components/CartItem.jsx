import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/actions'; 
import { getImageUrl } from '../utils/imageHelper'; 
import styles from './CartItem.module.css';

const PlusIcon = () => <span>+</span>;
const MinusIcon = () => <span>-</span>;

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
        dispatch(decrementQuantity(item.id));
    } else {
        dispatch(removeFromCart(item.id));
    }
  };

  const imageSource = getImageUrl(item.imageUrl);

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <img src={imageSource} alt={item.title} className={styles.image} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.brand}>{item.brand}</p>
      </div>

      <div className={styles.quantityControl}>
        <button className={styles.qtyButton} onClick={handleDecrement}>
            <MinusIcon />
        </button>
        
        <span className={styles.quantity}>{item.quantity}</span>
        
        <button className={styles.qtyButton} onClick={handleIncrement}>
            <PlusIcon />
        </button>
      </div>

      <div className={styles.price}>
        ${item.price}
      </div>
    </div>
  );
}

export default CartItem;