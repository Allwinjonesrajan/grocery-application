import './App.css';
import { useState } from "react";
import { CartProvider } from './Component/CartContext';

import Navbar from './Component/Navbar';
import Carousel from './Component/Carousel';
import Footer from './Component/Footer';
import ProductList from './Component/ProductList';
import OfferPage from './Component/OfferPage';
import CartPage from './Component/CartPage';
import ContactPage from './Component/ContactPage';

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState("home");

  const navigateToHome = () => {
    setPage("home");
  };

  return (
    <CartProvider>
      <Navbar 
        setSearch={setSearch} 
        setCategory={setCategory} 
        setPage={setPage}
      />

      {page === "home" && (
        <>
          <Carousel/>
          <ProductList 
            search={search} 
            category={category}
            onNavigateToCart={() => setPage("cart")} 
          />
        </>
      )}
      
      {page === "products" && (
        <ProductList 
          search={search} 
          category={category}
          onNavigateToCart={() => setPage("cart")}
        />
      )}
      
      {page === "offer" && (
        <OfferPage onNavigate={navigateToHome} />
      )}
      
      {page === "cart" && (
        <CartPage onNavigate={navigateToHome} />
      )}
      
      {page === "contact" && <ContactPage />}

      <Footer/>
    </CartProvider>
  );
}

export default App;