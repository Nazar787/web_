import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetailPage.module.css'; 

import Button from '../components/Button'; 
import Select from '../components/Select';
import Loader from '../components/Loader'; 

import { getProductById } from '../api/productsApi'; 
import { getImageUrl } from '../utils/imageHelper'; 

import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';

function ProductDetailPage() { 
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const data = await getProductById(id);
            setProduct(data);
        } catch (err) {
            setError('Product not found or server error');
        } finally {
            setIsLoading(false);
        }
    };

    fetchProduct();
  }, [id]);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (isLoading) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Loader />
        </div>
    );
  }

  if (error || !product) {
    return <div className={styles.error}>Product not found!</div>;
  }

  const volumeOptions = [
    { value: product.volume, label: product.volume }
  ];

  const imageSource = getImageUrl(product.imageUrl);

  return (
    <div className={styles.detailPage}>
      <div className={styles.imageContainer}>
        <img src={imageSource} alt={product.title} />
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
          <Button className={styles.addButton} onClick={handleAddToCart}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;