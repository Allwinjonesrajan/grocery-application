import React, { useEffect, useState } from "react";
import { useCart } from './CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductList({ search = "", category = "All", onNavigateToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://grocery-app-backend-3uzv.onrender.com/api/products")
      .then(res => {
        if (!res.ok) {
          throw new Error("API Failed");
        }
        return res.json();
      })
      .then(data => {
        console.log("API DATA:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const increaseQty = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const decreaseQty = (id) => {
    setQuantities(prev => {
      const currentQty = prev[id] || 0;
      if (currentQty <= 1) {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      }
      return {
        ...prev,
        [id]: currentQty - 1
      };
    });
  };

  const handleAddToCart = (product, qty) => {
    if (!qty) {
      toast.warning("Please select quantity first!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    
    addToCart(product, qty);
    
    toast.success(` Added ${qty} × ${product.name} to cart!`, {
      position: "top-right",
      autoClose: 2000,
      onClick: () => {
        if (onNavigateToCart) {
          onNavigateToCart();
        }
      }
    });
    
    setTimeout(() => {
      if (onNavigateToCart) {
        onNavigateToCart();
      }
    }, 1500);
    
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[product.id];
      return newQuantities;
    });
  };

  const filteredProducts = products.filter((item) => {
    if (!item || !item.name) return false;
    
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" ||  (item.category && item.category === category);
    
    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}></div>
        <h2>Loading delicious products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2 style={{ color: "#e74c3c" }}>😕 {error}</h2>
        <p>Please check your connection and try again</p>
        <button style={styles.retryBtn} onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div className="product-grid" style={styles.productGrid}>
        {filteredProducts.length === 0 ? (
          <div style={styles.noProducts}>
            <h2>No Products Found</h2>
            <p>Try adjusting your search or category filter</p>
            <button 
              style={styles.clearBtn}
              onClick={() => window.location.reload()}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredProducts.map((item) => {
            const currentQty = quantities[item.id] || 0;
            
            return (
              <div className="product-card" style={styles.productCard} key={item.id}>
                <div style={styles.imageBox}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={styles.image}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=🛒";
                    }}
                  />
                </div>

                <div style={styles.content}>
                  <h3 style={styles.productName}>{item.name}</h3>
                  
                  <div style={styles.priceSection}>
                    <span style={styles.price}>₹{item.price}</span>
                    <span style={styles.unit}>{item.quantity}</span>
                  </div>

                  <p style={styles.description}>{item.description}</p>

                  <div style={styles.actionSection}>
                    {currentQty === 0 ? (
                      <button 
                        style={styles.addBtn}
                        onClick={() => increaseQty(item.id)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <>
                        <div style={styles.qtyControls}>
                          <button 
                            style={styles.qtyBtn}
                            onClick={() => decreaseQty(item.id)}
                          >
                            −
                          </button>
                          <span style={styles.qtyValue}>{currentQty}</span>
                          <button 
                            style={styles.qtyBtn}
                            onClick={() => increaseQty(item.id)}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          style={styles.cartBtn}
                          onClick={() => handleAddToCart(item, currentQty)}
                        >
                          Add {currentQty} to Cart
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }
        
       
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
  },
  filterInfo: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  productGrid: {
    display: 'grid',
    gap: '20px',
  },
  noProducts: {
    textAlign: 'center',
    padding: '50px',
    gridColumn: '1 / -1',
  },
  clearBtn: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  imageBox: {
    height: '220px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  content: {
    padding: '20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  productName: {
    margin: '0 0 10px 0',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#2c3e50',
  },
  priceSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  price: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#27ae60',
  },
  unit: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
    backgroundColor: '#ecf0f1',
    padding: '4px 10px',
    borderRadius: '15px',
  },
  description: {
    margin: '0 0 15px 0',
    color: '#7f8c8d',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    flex: 1,
  },
  actionSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: 'auto',
  },
  addBtn: {
    width: '100%',
    padding: '12px',
    background: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    backgroundColor: '#f8f9fa',
    padding: '5px',
    borderRadius: '30px',
    border: '1px solid #e0e0e0',
  },
  qtyBtn: {
    width: '35px',
    height: '35px',
    border: 'none',
    borderRadius: '50%',
    backgroundColor: 'white',
    color: '#27ae60',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  qtyValue: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    minWidth: '30px',
    textAlign: 'center',
  },
  cartBtn: {
    width: '100%',
    padding: '12px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: '20px',
  },
  loader: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #27ae60',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '50px',
  },
  retryBtn: {
    padding: '10px 30px',
    background: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default ProductList;