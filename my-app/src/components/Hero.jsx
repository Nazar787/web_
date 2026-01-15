import React from 'react';
import styles from './Hero.module.css';
import heroImage from '../assets/heroImage.jpg';

function Hero() {
  return (
    <section className={styles.hero}>
      
    <div className={styles.heroImageContainer}> 
        <img src={heroImage} alt="The Art of Aroma" className={styles.heroActualImage} />
      </div>

      <div className={styles.heroText}>
        <h1 className={styles.heroHeading}>
          The Art of Aroma
        </h1>
        <p className={styles.heroSubheading}>
          Unveil a world of captivating perfumes. Find the perfect scent for every story, every mood, every you.
        </p>
      </div>

    </section>
  );
}

export default Hero;