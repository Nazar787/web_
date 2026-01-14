import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetailPage.module.css'; 
import Button from '../components/Button'; 
import Select from '../components/Select';

function ProductDetailPage({ products }) { 
  const { id } = useParams(); 
  const navigate = useNavigate();

  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return <div>Product not found!</div>;
  }
  const volumeOptions = [
    { value: product.volume, label: product.volume }
  ];

  return (
    <div className={styles.detailPage}>
      <div className={styles.imageContainer}>
        <img src={product.imageUrl} alt={product.title} />
      </div>

      <div className={styles.infoContainer}>
        
        <h1 className={styles.title}>{product.brand} - {product.title}</h1>
        
        <p className={styles.description}>{product.description}</p>

        <div className={styles.detailsRow}>
          <p><strong>Sex:</strong> {product.sex}</p>
          <p><strong>Made in:</strong> {product.madeIn}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
        </div>

        <div className={styles.selectorContainer}>
          <Select 
            label="Volume:" 
            name="volume" 
            options={volumeOptions} 
            wrapperClassName={styles.detailSelectWrapper}
          />
        </div>

        <p className={styles.price}>Price: ${product.price}.00</p>

        <div className={styles.buttonGroup}>
          <Button 
            onClick={() => navigate(-1)} 
            className={styles.goBackButton}
          >
            Go Back
          </Button>          
          <Button className={styles.addButton}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;