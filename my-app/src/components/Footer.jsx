import React from 'react';
import styles from './Footer.module.css';
import logo from '../assets/logo-icon.jpg';
import iconInst from '../assets/iconInst.png'; 
import iconFb from '../assets/iconFb.png';
import iconYou from '../assets/iconYou.png';
import iconTg from '../assets/iconTg.png';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        <div className={styles.footerTop}>
          
          <div className={styles.branding}>
            <h4>Scentoria stuff</h4>
            <p>
              Your destination for luxury perfumes. Discover, explore, and indulge in the finest fragrances.  
              Follow us on social media for the latest releases and exclusive offers.
            </p>
          </div>

          <div className={styles.footerLogo}>
            <img src={logo} alt="Scentoria Logo" />
          </div>

          <div className={styles.socialIcons}>
            <a href="https://www.instagram.com/scentoria.ae/" target="_blank" rel="noopener noreferrer"><img src={iconInst} alt="Instagram" /></a>
            <a href="https://t.me/scentoria_parfums" target="_blank" rel="noopener noreferrer"><img src={iconTg} alt="Telegram" /></a>
            <a href="https://www.facebook.com/?locale=uk_UA" target="_blank" rel="noopener noreferrer"><img src={iconFb} alt="Facebook" /></a>
            <a href="https://www.youtube.com/"target="_blank" rel="noopener noreferrer"><img src={iconYou} alt="YouTube" /></a>
          </div>
          
        </div>

        <div className={styles.footerBottom}>
          <p>
            © 2025 Scentoria © Copyright all rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;