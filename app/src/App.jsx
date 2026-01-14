import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; 

import Header from './components/Header'; 
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import HeaderFilter from './components/HeaderFilter'; 

import perfume1 from './assets/parLinterdit.png';
import perfume2 from './assets/parDiorSavage.png';
import perfume3 from './assets/parGoodGirl.png';
import perfume4 from './assets/parBlueChanel.png';

const catalogProductsData = [
{
  id: 101,
  title: 'L’Interdit Rouge', 
  brand: 'GIVENCHY',
  description: 'Bold yet elegantly refined, Givenchy L’Interdit Rouge opens with fiery bursts of red orange and ginger, flows into a heart of jasmine and tuberose.',
  type: 'eau de parfum', 
  volume: '125 ML', 
  price: '152',
  imageUrl: perfume1,
  madeIn: 'France',
  sex: 'Woman'
  },
  {
    id: 102,
    title: 'Sauvage',
    brand: 'DIOR',
    description: 'A fresh and powerful scent with bergamot, pepper, and amberwood, evoking freedom, masculinity, and the dark allure of an abuser.',
    type: 'eau de parfum', 
    volume: '60 ML', 
    price: '95',
    imageUrl: perfume2,
    madeIn: 'France',
    sex: 'Man'
  }, 
  { 
    id: 103,
    title: 'Good Girl Blush',
    brand: 'CAROLINA HERRERA',
    type: 'eau de parfum', 
    description: 'A soft yet confident fragrance that blends fresh bergamot and mandarin with romantic peony and rose, resting on a warm base of vanilla and tonka bean.',
    volume: '80 ML', 
    price: '164',
    imageUrl: perfume3,
    madeIn: 'USA',
    sex: 'Woman'
  },
  { 
    id: 104,
    title: 'Bleu De Chanel',
    brand: 'CHANEL',
    type: 'eau de parfum', 
    description:'A timeless, elegant fragrance that blends fresh citrus and aromatic woods. It’s a bold yet refined scent that embodies freedom, confidence, and modern masculinity.',
    volume: '150 ML', 
    price: '185',
    imageUrl: perfume4,
    madeIn: 'France',
    sex: 'Man'
  }
];


function App() {
  const [products, setProducts] = useState(catalogProductsData);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const filteredProducts = products.filter((product) => {
    const title = product.title.toLowerCase();
    const brand = product.brand.toLowerCase();
    const term = searchTerm.toLowerCase();

    const searchMatch = title.includes(term) || brand.includes(term);

    const sexMatch = !selectedSex || product.sex === selectedSex;
    const countryMatch = !selectedCountry || product.madeIn === selectedCountry;
    const brandMatch = !selectedBrand || product.brand === selectedBrand;

    return searchMatch && sexMatch && countryMatch && brandMatch;
  });

  return (
    <div className="App">
      <Header setSearchTerm={setSearchTerm} />
      <main>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route 
            path="/catalog" 
            element={
              <>
                <HeaderFilter 
                  selectedSex={selectedSex}
                  setSelectedSex={setSelectedSex}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                />
                <CatalogPage products={filteredProducts} />
              </>
            } 
          />
          <Route 
            path="/product/:id" 
            element={ <ProductDetailPage products={products} /> } 
          />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;