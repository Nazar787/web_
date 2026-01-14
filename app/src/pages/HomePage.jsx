import React, { useState } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import Button from '../components/Button';
import styles from './HomePage.module.css';

import home1Image from '../assets/home1.png'; 
import home2Image from '../assets/home2.png'; 

function HomePage() {
  const [isMoreContentVisible, setIsMoreContentVisible] = useState(false);

  const handleViewMore = () => {
    setIsMoreContentVisible(true);
  };

  return (
    <>
      <Hero />
      <ProductList />

      {!isMoreContentVisible && (
        <div className={styles.buttonContainer}>
          <Button onClick={handleViewMore}>
            View more
          </Button>
        </div>
      )}

      {isMoreContentVisible && (
        <section className={styles.moreContentWrapper}>
          
          <div className={styles.moreImageContainer}>
            <img src={home1Image} alt="Special Offer 1" className={styles.moreImage} />
          </div>

          <div className={styles.newsletterText}>
            <h2>Step into the universe of our newest fragrances, where timeless elegance meets modern creativity.</h2>
            <p>Explore meticulously crafted compositions, delicate accords, and bold signature notes designed to complement your style. Experience the essence of luxury with every scent.</p>
          </div>
          
          <div className={styles.moreImageContainer}>
            <img src={home2Image} alt="Special Offer 2" className={styles.moreImage} />
          </div>

        </section>
      )}
    </>
  );
}

export default HomePage;