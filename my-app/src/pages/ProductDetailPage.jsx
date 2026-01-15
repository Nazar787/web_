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
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Стейт для вибраного варіанту
  const [selectedVolume, setSelectedVolume] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const data = await getProductById(id);
            
            // --- ВИПРАВЛЕННЯ: ШТУЧНЕ ДОДАВАННЯ ВАРІАНТІВ ---
            // Якщо сервер не дає variants, ми створюємо їх самі для демонстрації
            if (!data.variants) {
                data.variants = [
                    { volume: '50ml', price: Math.round(Number(data.price) * 1) },
                    { volume: '100ml', price: Math.round(Number(data.price) * 1.5) },
                    { volume: '200ml', price: Math.round(Number(data.price) * 2.5) }
                ];
            }
            // ------------------------------------------------

            setProduct(data);
            
            // Ініціалізація вибору (беремо перший варіант як початковий)
            if (data.variants && data.variants.length > 0) {
                setSelectedVolume(data.variants[0].volume);
                setCurrentPrice(data.variants[0].price);
            } else {
                setSelectedVolume(data.volume);
                setCurrentPrice(data.price);
            }

        } catch (err) {
            console.error(err);
            setError('Product not found or server error');
        } finally {
            setIsLoading(false);
        }
    };

    fetchProduct();
  }, [id]);

  // Обробка зміни вибору в Select
  const handleVolumeChange = (e) => {
      const newVolume = e.target.value;
      setSelectedVolume(newVolume);

      // Знаходимо ціну для вибраного об'єму
      if (product && product.variants) {
          const variant = product.variants.find(v => v.volume === newVolume);
          if (variant) {
              setCurrentPrice(variant.price);
          }
      }
  };

  const handleAddToCart = () => {
    if (product) {
      // Створюємо унікальний ID для кошика: "ID_товару-Об'єм"
      const cartItemId = `${product.id}-${selectedVolume}`;

      const productToAdd = {
          ...product,
          id: cartItemId,         // Це важливо для Redux, щоб розрізняти 50ml і 100ml
          originalId: product.id, 
          price: currentPrice,    // Актуальна ціна
          volume: selectedVolume  // Актуальний об'єм
      };

      dispatch(addToCart(productToAdd));
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

  // Формуємо список опцій для селекта з наших варіантів
  let volumeOptions = [];
  if (product.variants) {
      volumeOptions = product.variants.map(v => ({
          value: v.volume,
          label: v.volume 
      }));
  }

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
            value={selectedVolume}     
            onChange={handleVolumeChange} 
            wrapperClassName={styles.detailSelectWrapper}
          />
        </div>

        <p className={styles.price}>Price: ${currentPrice}.00</p>

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