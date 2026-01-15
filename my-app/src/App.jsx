import React, { useState } from 'react'; 
import { Routes, Route } from 'react-router-dom';
import './App.css'; 

import Header from './components/Header'; 
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App">
      
      <Header setSearchTerm={setSearchTerm} />
      
      <main>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          
          <Route 
            path="/catalog" 
            element={ <CatalogPage searchTerm={searchTerm} /> } 
          />
          
          <Route 
            path="/product/:id" 
            element={ <ProductDetailPage /> } 
          />
          <Route 
          path="/cart" 
          element={<CartPage />} 
          />
          <Route 
            path="/checkout" 
            element={<CheckoutPage />} 
          />
          <Route 
            path="/success" 
            element={<SuccessPage />} 
          />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;