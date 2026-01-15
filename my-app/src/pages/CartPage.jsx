import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import styles from './CartPage.module.css';

function CartPage() {

    const cartItems = useSelector(state => state.cartItems);
    const navigate = useNavigate();

    const totalAmount = cartItems.reduce((total, item) => {
        return total + (Number(item.price) * item.quantity);
    }, 0);

  return (
    <div className={styles.cartPageContainer}>
      <h1 className={styles.pageTitle}>Shopping Cart</h1>

      <div className={styles.cartContent}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Your cart is currently empty.</p>
            <Button onClick={() => navigate('/catalog')} className={styles.goCatalogBtn}>
              Go to Catalog
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.itemsList}>
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className={styles.totalSection}>
              <span className={styles.totalLabel}>Total amount:</span>
              <span className={styles.totalValue}>${totalAmount}</span>
            </div>

            <div className={styles.actions}>
              <Button 
                onClick={() => navigate('/catalog')} 
                className={styles.backButton}>
                Back to Catalog
              </Button>
              
              <Button 
                className={styles.continueButton}
                onClick={() => navigate('/checkout')}
              >
                Continue
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;