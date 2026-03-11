import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import CheckoutDetails from './CheckoutDetails';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

function CheckoutFlow({ onClose, onNavigate }) {
  const [step, setStep] = useState('details');
  const [deliveryData, setDeliveryData] = useState(null);
  const { clearCart } = useCart();

  if (step === 'details') {
    return (
      <CheckoutDetails
        onNext={(formData) => {
          setDeliveryData(formData);
          setStep('payment');
        }}
        onBack={onClose}
      />
    );
  }

  if (step === 'payment') {
    return (
      <PaymentStep
        deliveryData={deliveryData}
        onNext={() => setStep('confirm')}
        onBack={() => setStep('details')}
      />
    );
  }

  if (step === 'confirm') {
    return (
      <OrderConfirmed
        deliveryData={deliveryData}
        onClose={() => { clearCart(); onNavigate(); }}
      />
    );
  }

  return null;
}

function PaymentStep({ deliveryData, onNext, onBack }) {
  const { getCartTotal, cartItems } = useCart();
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState('cod');
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (selected === 'upi') {
      if (!upiId.trim()) err.upi = 'Enter UPI ID';
      else if (!/\S+@\S+/.test(upiId)) err.upi = 'Invalid UPI ID (e.g. name@upi)';
    }
    if (selected === 'card') {
      if (!cardData.number || cardData.number.length < 16) err.number = 'Enter valid 16-digit card number';
      if (!cardData.name.trim()) err.name = 'Enter cardholder name';
      if (!cardData.expiry.trim()) err.expiry = 'Enter expiry date';
      if (!cardData.cvv || cardData.cvv.length < 3) err.cvv = 'Enter valid CVV';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handlePay = () => {
    if (validate()) onNext();
  };

  return (
    <div style={{
      ...s.container,
      padding: isMobile ? '16px 12px' : '30px 20px',
    }}>

      <div style={s.stepBar}>
        <div style={s.stepDone}>✓ Details</div>
        <div style={s.stepLine} />
        <div style={s.stepActive}>💳 Payment</div>
        <div style={s.stepLine} />
        <div style={s.stepPending}> Confirm</div>
      </div>

      <button onClick={onBack} style={s.backBtn}>← Back to Details</button>
      <h1 style={{ ...s.title, fontSize: isMobile ? '1.5rem' : '2rem' }}>
        💳 Payment
      </h1>
      <p style={s.subtitle}>Total: ₹{getCartTotal()}</p>

      <div style={s.card}>
        <h3 style={s.cardTitle}>📍 Delivering to</h3>
        <p style={s.infoText}><b>{deliveryData?.fullName}</b></p>
        <p style={s.infoText}>{deliveryData?.address}, {deliveryData?.city} - {deliveryData?.pincode}</p>
        <p style={s.infoText}>📞 {deliveryData?.phone}</p>
      </div>

      <div style={s.card}>
        <h3 style={s.cardTitle}>Select Payment Method</h3>

        <label style={s.radioLabel}>
          <input type="radio" value="cod" checked={selected === 'cod'}
            onChange={() => { setSelected('cod'); setErrors({}); }} style={s.radio} />
          <span>💵 Cash on Delivery</span>
        </label>

        <label style={s.radioLabel}>
          <input type="radio" value="upi" checked={selected === 'upi'}
            onChange={() => { setSelected('upi'); setErrors({}); }} style={s.radio} />
          <span>📱 UPI Payment</span>
        </label>

        {selected === 'upi' && (
          <div style={s.subFields}>
            <label style={s.label}>UPI ID *</label>
            <input
              type="text"
              placeholder="yourname@paytm / @gpay"
              value={upiId}
              onChange={e => { setUpiId(e.target.value); setErrors({}); }}
              style={{ ...s.input, ...(errors.upi ? s.inputErr : {}) }}
            />
            {errors.upi && <span style={s.errText}>{errors.upi}</span>}
          </div>
        )}

        <label style={s.radioLabel}>
          <input type="radio" value="card" checked={selected === 'card'}
            onChange={() => { setSelected('card'); setErrors({}); }} style={s.radio} />
          <span>💳 Credit / Debit Card</span>
        </label>

        {selected === 'card' && (
          <div style={s.subFields}>
            <div style={s.fieldGroup}>
              <label style={s.label}>Card Number *</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                maxLength="16"
                onChange={e => { setCardData(p => ({ ...p, number: e.target.value })); setErrors({}); }}
                style={{ ...s.input, ...(errors.number ? s.inputErr : {}) }}
              />
              {errors.number && <span style={s.errText}>{errors.number}</span>}
            </div>

            <div style={s.fieldGroup}>
              <label style={s.label}>Cardholder Name *</label>
              <input
                type="text"
                placeholder="Name on card"
                value={cardData.name}
                onChange={e => { setCardData(p => ({ ...p, name: e.target.value })); setErrors({}); }}
                style={{ ...s.input, ...(errors.name ? s.inputErr : {}) }}
              />
              {errors.name && <span style={s.errText}>{errors.name}</span>}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '12px',
            }}>
              <div style={s.fieldGroup}>
                <label style={s.label}>Expiry Date *</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  maxLength="5"
                  onChange={e => { setCardData(p => ({ ...p, expiry: e.target.value })); setErrors({}); }}
                  style={{ ...s.input, ...(errors.expiry ? s.inputErr : {}) }}
                />
                {errors.expiry && <span style={s.errText}>{errors.expiry}</span>}
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>CVV *</label>
                <input
                  type="password"
                  placeholder="•••"
                  value={cardData.cvv}
                  maxLength="3"
                  onChange={e => { setCardData(p => ({ ...p, cvv: e.target.value })); setErrors({}); }}
                  style={{ ...s.input, ...(errors.cvv ? s.inputErr : {}) }}
                />
                {errors.cvv && <span style={s.errText}>{errors.cvv}</span>}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={s.card}>
        <h3 style={s.cardTitle}>🧾 Order Summary</h3>
        {cartItems.map(item => (
          <div key={item.id} style={s.summaryRow}>
            <span style={{ flex: 1, paddingRight: '8px' }}>
              {item.name} × {item.quantity}
            </span>
            <span style={{ fontWeight: '600' }}>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div style={s.divider} />
        <div style={{ ...s.summaryRow, ...s.totalRow }}>
          <span>Delivery</span>
          <span style={{ color: '#27ae60' }}>FREE</span>
        </div>
        <div style={{ ...s.summaryRow, ...s.totalRow, fontSize: '1.1rem' }}>
          <span>Total</span>
          <span>₹{getCartTotal()}</span>
        </div>
      </div>

      <button onClick={handlePay} style={s.payBtn}>
        {selected === 'cod' ? ' Place Order (Cash on Delivery)' : `💳 Pay ₹${getCartTotal()}`}
      </button>

    </div>
  );
}

function OrderConfirmed({ deliveryData, onClose }) {
  const isMobile = useIsMobile();
  const orderId = 'ORD' + Math.floor(Math.random() * 900000 + 100000);

  return (
    <div style={s.confirmContainer}>
      <div style={{
        ...s.confirmBox,
        padding: isMobile ? '30px 20px' : '50px 40px',
        margin: isMobile ? '16px' : '0',
      }}>
        <div style={s.checkCircle}></div>
        <h1 style={{ ...s.confirmTitle, fontSize: isMobile ? '1.6rem' : '2.2rem' }}>
          Order Placed!
        </h1>
        <p style={s.confirmSubtitle}>
          Thank you, <b>{deliveryData?.fullName}</b>! 
        </p>

        <div style={s.orderIdBox}>
          <p style={{ color: '#7f8c8d', fontSize: '0.85rem', marginBottom: '4px' }}>Order ID</p>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2d6cdf' }}>{orderId}</p>
        </div>

        <div style={s.deliveryInfo}>
          <p> <b>Delivery Address</b></p>
          <p style={{ marginTop: '6px' }}>{deliveryData?.address}</p>
          <p>{deliveryData?.city} - {deliveryData?.pincode}</p>
          <p style={{ marginTop: '6px' }}> {deliveryData?.phone}</p>
          <p style={{ marginTop: '6px' }}> {deliveryData?.email}</p>
          <p style={{
            color: '#27ae60', fontWeight: 'bold',
            marginTop: '12px', fontSize: '1rem'
          }}>
             Expected delivery: 2–4 hours
          </p>
        </div>

        <button onClick={onClose} style={s.homeBtn}>
           Continue Shopping
        </button>
      </div>
    </div>
  );
}

const s = {
  container: {
    maxWidth: '680px',
    margin: '0 auto',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },

  stepBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '20px',
    padding: '14px 16px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    flexWrap: 'wrap',
  },
  stepDone: {
    fontSize: '0.85rem', fontWeight: '600',
    color: '#27ae60', padding: '4px 10px',
    backgroundColor: '#eafaf1', borderRadius: '20px',
  },
  stepActive: {
    fontSize: '0.85rem', fontWeight: '700',
    color: 'white', padding: '4px 12px',
    backgroundColor: '#2d6cdf', borderRadius: '20px',
  },
  stepPending: {
    fontSize: '0.85rem', fontWeight: '600',
    color: '#aaa', padding: '4px 10px',
    backgroundColor: '#f0f0f0', borderRadius: '20px',
  },
  stepLine: {
    height: '2px', width: '24px',
    backgroundColor: '#e0e0e0', borderRadius: '2px',
  },

  backBtn: {
    background: 'none', border: 'none',
    color: '#3498db', fontSize: '0.95rem',
    cursor: 'pointer', marginBottom: '10px',
    display: 'block', padding: '0',
  },
  title: {
    color: '#2c3e50', marginBottom: '4px', fontWeight: '700',
  },
  subtitle: {
    color: '#27ae60', fontWeight: 'bold',
    fontSize: '1rem', marginBottom: '20px',
  },

  card: {
    backgroundColor: 'white',
    borderRadius: '14px',
    padding: '18px 16px',
    marginBottom: '16px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.07)',
  },
  cardTitle: {
    fontSize: '1rem', color: '#2c3e50',
    marginBottom: '14px', fontWeight: '700',
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '10px',
  },
  infoText: {
    color: '#555', fontSize: '0.9rem', lineHeight: '1.7',
  },

  radioLabel: {
    display: 'flex', alignItems: 'center',
    gap: '12px', padding: '13px 0',
    borderBottom: '1px solid #f5f5f5',
    cursor: 'pointer', fontSize: '0.95rem',
    color: '#2c3e50', fontWeight: '500',
  },
  radio: {
    width: '18px', height: '18px',
    cursor: 'pointer', accentColor: '#2d6cdf',
  },

  subFields: {
    backgroundColor: '#f8faff',
    borderRadius: '10px',
    padding: '16px',
    marginTop: '4px',
    marginBottom: '4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '0.88rem',
  },
  input: {
    width: '100%',
    padding: '11px 13px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    backgroundColor: 'white',
  },
  inputErr: { borderColor: '#e74c3c' },
  errText: {
    color: '#e74c3c', fontSize: '0.8rem',
    marginTop: '3px', display: 'block',
  },

  summaryRow: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center',
    padding: '9px 0',
    borderBottom: '1px solid #f5f5f5',
    fontSize: '0.92rem', color: '#555',
  },
  totalRow: {
    fontWeight: 'bold', color: '#2c3e50',
    borderBottom: 'none',
  },
  divider: {
    height: '1px', backgroundColor: '#e0e0e0',
    margin: '8px 0',
  },

  payBtn: {
    width: '100%', padding: '16px',
    background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    color: 'white', border: 'none',
    borderRadius: '12px', fontSize: '1.05rem',
    fontWeight: 'bold', cursor: 'pointer',
    marginBottom: '30px',
    boxShadow: '0 4px 15px rgba(39,174,96,0.3)',
  },

  confirmContainer: {
    minHeight: '100vh', backgroundColor: '#f8f9fa',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '20px',
  },
  confirmBox: {
    backgroundColor: 'white', borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    maxWidth: '460px', width: '100%',
  },
  checkCircle: { fontSize: '4.5rem', marginBottom: '14px' },
  confirmTitle: {
    color: '#27ae60', marginBottom: '8px', fontWeight: '700',
  },
  confirmSubtitle: {
    fontSize: '1rem', color: '#555', marginBottom: '20px',
  },
  orderIdBox: {
    backgroundColor: '#f0f7ff', borderRadius: '12px',
    padding: '14px', marginBottom: '16px',
  },
  deliveryInfo: {
    backgroundColor: '#f8f9fa', borderRadius: '12px',
    padding: '16px', marginBottom: '20px',
    color: '#555', fontSize: '0.9rem',
    lineHeight: '1.7', textAlign: 'left',
  },
  homeBtn: {
    width: '100%', padding: '14px',
    background: 'linear-gradient(135deg, #2d6cdf, #1a57c8)',
    color: 'white', border: 'none',
    borderRadius: '12px', fontSize: '1rem',
    fontWeight: 'bold', cursor: 'pointer',
  },
};

export default CheckoutFlow;