import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions'; // Перевір шлях
import styles from './ProductList.module.css';
import ProductCard from './ProductCard';

function ProductList() {
  const dispatch = useDispatch();
  
  // Беремо товари з Redux (які прийшли з бекенду)
  // Якщо в тебе reducer називається інакше, заміни 'products' на правильну назву
  const products = useSelector((state) => state.products || []);

  // Завантажуємо товари при старті сторінки
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className={styles.listSection}>
      <div className={styles.listContainer}>
        
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} // Передаємо цілий об'єкт
            />
          ))
        ) : (
          <p>Завантаження товарів...</p>
        )}
        
      </div>
    </section>
  );
}

export default ProductList;