import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import CheckoutFlow from './CheckoutFlow';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  window.scrollTo(0, 0);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

function CartPage({ onNavigate }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const isMobile = useIsMobile();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getTotalItems
  } = useCart();

  if (showCheckout) {
    return <CheckoutFlow 
  onClose={() => setShowCheckout(false)} 
  onNavigate={onNavigate} 
/>;
  }

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <div style={styles.emptyCartIcon}>🛒</div>
        <h2>Your cart is empty</h2>
        <p style={{ color: '#7f8c8d', marginTop: '8px' }}>Add some products to your cart</p>
        <button 
          style={styles.shopBtn} 
          onClick={() => {
            console.log("Empty cart button clicked");
            if (typeof onNavigate === 'function') {
              onNavigate();
            } else {
              console.error("onNavigate is not a function:", onNavigate);
            }
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ ...styles.title, fontSize: isMobile ? '1.6rem' : '2.5rem' }}>
          🛒 Shopping Cart
        </h1>
        <p style={styles.itemCount}>{getTotalItems()} items</p>
      </div>

      <div style={{
        ...styles.cartGrid,
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
        gap: isMobile ? '20px' : '30px',
      }}>

        <div style={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} style={{
              ...styles.cartItem,
              gridTemplateColumns: isMobile ? '70px 1fr' : '100px 1fr',
              padding: isMobile ? '14px' : '20px',
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  ...styles.itemImage,
                  width: isMobile ? '70px' : '100px',
                  height: isMobile ? '70px' : '100px',
                }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{ ...styles.itemName, fontSize: isMobile ? '1rem' : '1.2rem' }}>
                  {item.name}
                </h3>
                <p style={styles.itemPrice}>₹{item.price} per unit</p>

                <div style={{
                  ...styles.itemActions,
                  marginTop: '10px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}>
                  <div style={styles.qtyControls}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >−</button>
                    <span style={styles.qtyValue}>{item.quantity}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>

                  <div style={{ ...styles.itemTotal, fontSize: isMobile ? '1rem' : '1.2rem' }}>
                    ₹{item.price * item.quantity}
                  </div>

                  <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.cartSummary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>

          <div style={styles.summaryRow}>
            <span>Subtotal ({getTotalItems()} items)</span>
            <span>₹{getCartTotal()}</span>
          </div>

          <div style={styles.summaryRow}>
            <span>Delivery Fee</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>FREE</span>
          </div>

          <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
            <span>Total</span>
            <span>₹{getCartTotal()}</span>
          </div>

          <button style={styles.checkoutBtn} onClick={() => setShowCheckout(true)}>
            Proceed to Checkout
          </button>
          <button style={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
          <button 
            style={styles.continueBtn} 
            onClick={() => {
              console.log("Continue shopping button clicked");
              if (typeof onNavigate === 'function') {
                onNavigate();
              } else {
                console.error("onNavigate is not a function:", onNavigate);
                window.history.back();
              }
            }}
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 16px',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '6px',
  },
  itemCount: {
    fontSize: '1rem',
    color: '#7f8c8d',
  },
  cartGrid: {
    display: 'grid',
    alignItems: 'start',
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cartItem: {
    display: 'grid',
    gap: '14px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    alignItems: 'start',
  },
  itemImage: {
    objectFit: 'cover',
    borderRadius: '10px',
  },
  itemName: {
    marginBottom: '4px',
    color: '#2c3e50',
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: '0.95rem',
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: '2px',
  },
  itemUnit: {
    fontSize: '0.85rem',
    color: '#7f8c8d',
  },
  itemActions: {
    display: 'flex',
    alignItems: 'center',
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f8f9fa',
    padding: '4px 8px',
    borderRadius: '30px',
    border: '1px solid #e0e0e0',
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    border: 'none',
    borderRadius: '50%',
    backgroundColor: '#0d6efd',
    color: 'white',
    fontSize: '1.1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyValue: {
    fontSize: '1rem',
    fontWeight: 'bold',
    minWidth: '24px',
    textAlign: 'center',
  },
  itemTotal: {
    fontWeight: 'bold',
    color: '#2c3e50',
    minWidth: '70px',
  },
  removeBtn: {
    width: '30px',
    height: '30px',
    border: 'none',
    borderRadius: '50%',
    backgroundColor: '#ff6b6b',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartSummary: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    height: 'fit-content',
  },
  summaryTitle: {
    fontSize: '1.4rem',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '0.95rem',
  },
  totalRow: {
    borderBottom: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    paddingTop: '16px',
  },
  checkoutBtn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.05rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
  },
  clearBtn: {
    width: '100%',
    padding: '12px',
    background: '#ff6b6b',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '10px',
  },
  continueBtn: {
    width: '100%',
    padding: '12px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '10px',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '60px 20px',
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartIcon: {
    fontSize: '5rem',
    marginBottom: '16px',
  },
  shopBtn: {
    padding: '14px 36px',
    background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.05rem',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default CartPage;