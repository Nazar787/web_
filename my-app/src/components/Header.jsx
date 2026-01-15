import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-icon.jpg'; 
import styles from './Header.module.css';
import cartIcon from '../assets/cartIcon.png';

function Header({ setSearchTerm }) {
  const navigate = useNavigate(); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
    navigate('/catalog');
  };

  return (
    <header className={styles.header}>
      
      <div className={styles.logoContainer}>
        <img 
            src={logo} 
            alt="Scentoria Logo" 
            className={styles.logo} 
            onError={(e) => {e.target.style.display='none'}}
        />
      </div>

      <nav className={styles.nav}>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Home
        </NavLink>

        <NavLink 
          to="/catalog" 
          className={({ isActive }) => 
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Catalog
        </NavLink>
      </nav>
        
      <div className={styles.utilityContainer}>
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Enter the perfume name" 
            className={styles.searchInput}
            onChange={handleSearchChange}
          />
          <button type="submit" className={styles.searchButton}> 
            Search
          </button>
        </form>

        <NavLink 
          to="/cart" 
          className={({ isActive }) => 
            isActive ? `${styles.cartLink} ${styles.active}` : styles.cartLink
          }
        >
          <img src={cartIcon} alt="Cart" className={styles.cartIcon} />
        </NavLink>
      </div>
      
    </header>
  );
}

export default Header;