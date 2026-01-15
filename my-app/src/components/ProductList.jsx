import React from 'react';
import styles from './ProductList.module.css';
import ProductCard from './ProductCard';
import parfume1 from '../assets/parfume1.jpg'
import parfume2 from '../assets/parfume2.jpg'
import parfume3 from '../assets/parfume3.jpg'



const productsData = [
  {
    id: 1,
    title: 'Homme Yves Saint Laurent',
    description: 'A line of luminous floral‑woody fragrances inspired by discovery and meaningful encounters, celebrating confidence, authenticity, and personal journeys.',
    imageUrl: parfume1
  },

  {
    id: 2,
    title: 'Bleu de Chanel Collection',
    description: 'A line of refined, versatile fragrances for men, blending fresh citrus, aromatic woods, and subtle spices. Designed for the modern man, each scent embodies elegance, freedom, and timeless confidence.',
    imageUrl: parfume2
  },
  
  {
    id: 3,
    title: 'Giorgio Armani My Way',
    description: 'A line of luminous floral‑woody fragrances inspired by discovery and meaningful encounters, celebrating confidence, authenticity, and personal journeys.',
    imageUrl: parfume3
    }
];

function ProductList() {
  return (
    <section className={styles.listSection}>
      
      <div className={styles.listContainer}>
      
        {productsData.map((product) => (
          <ProductCard 
            key={product.id} 
            title={product.title} 
            description={product.description} 
            imageUrl={product.imageUrl}
          />
        ))}
        
      </div>
    </section>
  );
}

export default ProductList;