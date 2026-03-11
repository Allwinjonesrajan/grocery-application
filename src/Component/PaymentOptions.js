import React, { useState } from 'react';
import { useCart } from './CartContext';

function PaymentOptions({ userDetails, onBack, onOrderPlaced }) {
  const { getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [processing, setProcessing] = useState(false);
  

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: '💵',
      description: 'Pay when you receive your order'
    },
    {
      id: 'online',
      name: 'Online Payment',
      icon: '💳',
      description: 'Pay via UPI, Card, or Net Banking'
    }
  ];

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      setShowPopup(true);
    }, 1500);
  };

  const handleOrderPlaced = () => {
    clearCart();
    onOrderPlaced();
  };

  if (showPopup) {
    return (
      <div style={styles.popupOverlay}>
        <div style={styles.popup}>
          <div style={styles.popupIcon}>✅</div>
          <h2 style={styles.popupTitle}>Order Placed Successfully!</h2>
          <p style={styles.popupMessage}>
            Thank you for your order, {userDetails.fullName}!
          </p>
          <div style={styles.orderDetails}>
            <p>📦 Order ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p>💳 Payment: {paymentMethods.find(p => p.id === paymentMethod)?.name}</p>
            <p>📍 Delivery to: {userDetails.address}, {userDetails.city}</p>
            <p>📞 Contact: {userDetails.phone}</p>
            <p style={styles.totalAmount}>Total: ₹{getCartTotal()}</p>
          </div>
          <button 
            style={styles.continueShopBtn}
            onClick={handleOrderPlaced}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.summaryCard}>
          <h3 style={styles.summaryTitle}>📋 Order Summary</h3>
          <div style={styles.summaryDetails}>
            <p><strong>Name:</strong> {userDetails.fullName}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Address:</strong> {userDetails.address}, {userDetails.city} - {userDetails.pincode}</p>
          </div>
        </div>

        <div style={styles.paymentGrid}>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              style={{
                ...styles.paymentCard,
                ...(paymentMethod === method.id ? styles.selectedCard : {})
              }}
              onClick={() => setPaymentMethod(method.id)}
            >
              <div style={styles.paymentIcon}>{method.icon}</div>
              <div style={styles.paymentInfo}>
                <h3 style={styles.paymentName}>{method.name}</h3>
                <p style={styles.paymentDesc}>{method.description}</p>
              </div>
              {paymentMethod === method.id && (
                <div style={styles.checkmark}>✓</div>
              )}
            </div>
          ))}
        </div>

        <div style={styles.totalCard}>
          <span style={styles.totalLabel}>Total Amount:</span>
          <span style={styles.totalValue}>₹{getCartTotal()}</span>
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={onBack} style={styles.secondaryBtn}>
            ← Back
          </button>
          <button 
            onClick={handlePayment} 
            style={styles.primaryBtn}
            disabled={processing}
          >
            {processing ? '⏳ Processing...' : ` Place Order • ₹${getCartTotal()}`}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#f8f9fa',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  summaryTitle: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '2px solid #f0f0f0',
  },
  summaryDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    lineHeight: '1.6',
    color: '#34495e',
  },
  paymentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  paymentCard: {
    backgroundColor: 'white',
    padding: '25px 20px',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    position: 'relative',
    border: '2px solid transparent',
  },
  selectedCard: {
    borderColor: '#27ae60',
    transform: 'scale(1.02)',
    boxShadow: '0 10px 25px rgba(39,174,96,0.2)',
    backgroundColor: '#f0fff4',
  },
  paymentIcon: {
    fontSize: '2.5rem',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: '1.2rem',
    marginBottom: '5px',
    color: '#2c3e50',
    fontWeight: '600',
  },
  paymentDesc: {
    fontSize: '0.85rem',
    color: '#7f8c8d',
  },
  checkmark: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '25px',
    height: '25px',
    backgroundColor: '#27ae60',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
  },
  totalCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '2px dashed #27ae60',
  },
  totalLabel: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#2c3e50',
  },
  totalValue: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#27ae60',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
  },
  primaryBtn: {
    flex: 2,
    padding: '16px',
    background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(39,174,96,0.3)',
  },
  secondaryBtn: {
    flex: 1,
    padding: '16px',
    background: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  popup: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '20px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    animation: 'slideIn 0.3s ease',
  },
  popupIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
  },
  popupTitle: {
    fontSize: '2rem',
    color: '#27ae60',
    marginBottom: '15px',
    fontWeight: '700',
  },
  popupMessage: {
    fontSize: '1.1rem',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  orderDetails: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '25px',
    textAlign: 'left',
    lineHeight: '1.8',
  },
  totalAmount: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#27ae60',
    marginTop: '10px',
    borderTop: '1px solid #e0e0e0',
    paddingTop: '10px',
  },
  continueShopBtn: {
    padding: '15px 40px',
    background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @media (max-width: 600px) {
    .payment-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default PaymentOptions;