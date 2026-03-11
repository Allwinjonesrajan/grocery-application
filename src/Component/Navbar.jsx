import React, { useState } from "react";
import { useCart } from './CartContext';

function Navbar({ setSearch, setCategory, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  const handlePage = (page) => {
    setPage(page);
    setMenuOpen(false); 
  };

  return (
    <>
      <nav className="navbar">
        <h2 className="logo" onClick={() => handlePage("home")}>Grocery App</h2>

        <div className="nav-center desktop-only">
          <input
            type="text"
            className="search-input"
            placeholder="Search groceries..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="category-dropdown" onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Fruits & Vegetables">Fruits & Vegetables</option>
            <option value="Oil & Dairy">Oil & Dairy</option>
            <option value="Snacks & Biscuits">Snacks & Biscuits</option>
            <option value="Beverages">Beverages</option>
            <option value="Meat & Fish">Meat & Fish</option>
            <option value="Groceries & Staples">Groceries & Staples</option>
          </select>
        </div>

        <ul className="nav-right desktop-only">
          <li onClick={() => handlePage("home")}>Home</li>
          <li onClick={() => handlePage("products")}>Products</li>
          <li onClick={() => handlePage("offer")}>Offer</li>
          <li onClick={() => handlePage("contact")}>Contact</li>
          <li onClick={() => handlePage("cart")} style={{ position: 'relative' }}>
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </li>
        </ul>

        <div className="mobile-right mobile-only">
          <span onClick={() => handlePage("cart")} style={{ position: 'relative', fontSize: '22px', cursor: 'pointer' }}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </span>
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <input
            type="text"
            className="mobile-search"
            placeholder="Search groceries..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="mobile-dropdown"
            onChange={(e) => { setCategory(e.target.value); }}
          >
            <option value="All">All Categories</option>
            <option value="Fruits & Vegetables">Fruits & Vegetables</option>
            <option value="Oil & Dairy">Oil & Dairy</option>
            <option value="Snacks & Biscuits">Snacks & Biscuits</option>
            <option value="Beverages">Beverages</option>
            <option value="Meat & Fish">Meat & Fish</option>
            <option value="Groceries & Staples">Groceries & Staples</option>
          </select>

          <ul className="mobile-nav-links">
            <li onClick={() => handlePage("home")}>🏠 Home</li>
            <li onClick={() => handlePage("products")}>📦 Products</li>
            <li onClick={() => handlePage("offer")}>🏷️ Offer</li>
            <li onClick={() => handlePage("contact")}>📞 Contact</li>
            <li onClick={() => handlePage("cart")}>
              🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;