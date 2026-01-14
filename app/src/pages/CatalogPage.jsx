import React from 'react';

import CatalogItemCard from '../components/CatalogItemCard'; 
import styles from './CatalogPage.module.css';

function CatalogPage({ products }) {
  return (
    <div className="catalogPageContainer">

      <div className={styles.catalogGrid}>
        
        {products.map((product) => (
          <CatalogItemCard
            key={product.id}
            id={product.id} 
            title={product.title}
            price={product.price}
            imageUrl={product.imageUrl}
            brand={product.brand}
            madeIn={product.madeIn}
            sex={product.sex}
            type={product.type}
            volume={product.volume}
          />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;