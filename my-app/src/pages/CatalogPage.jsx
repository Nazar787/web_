import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/productsApi';
import CatalogItemCard from '../components/CatalogItemCard';
import Loader from '../components/Loader';
import HeaderFilter from '../components/HeaderFilter';
import styles from './CatalogPage.module.css';

function CatalogPage({ searchTerm }) {  

    const [products, setProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedSex, setSelectedSex] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');

    const [activeFilters, setActiveFilters] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const filtersToSend = {
                    ...activeFilters,
                    ...(searchTerm ? { q: searchTerm } : {})
                };

                const data = await getProducts(filtersToSend);
                setProducts(data || []);
                
            } catch (err) {
                console.error("Помилка завантаження каталогу:", err);
                setError('Не вдалося завантажити товари.');
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [activeFilters, searchTerm]);

    const applyFilters = () => {
        const newActiveFilters = {};

        if (selectedSex) newActiveFilters.sex = selectedSex;
        if (selectedCountry) newActiveFilters.madeIn = selectedCountry;
        if (selectedBrand) newActiveFilters.brand = selectedBrand;

        setActiveFilters(newActiveFilters);
    };

    if (isLoading) {
        return (
            <div className={styles.centeredContainer}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <h1>Помилка завантаження </h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="catalogPageContainer">

            <HeaderFilter
                selectedSex={selectedSex}
                setSelectedSex={setSelectedSex}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                onApply={applyFilters}
            />

            {products.length === 0 ? (
                <div className={styles.noResultsContainer}>
                    <p>Товарів за вибраними критеріями не знайдено.</p>
                </div>
            ) : (
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
            )}
        </div>
    );
}

export default CatalogPage;