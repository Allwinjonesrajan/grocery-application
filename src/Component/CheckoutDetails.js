import React, { useState } from 'react';

function CheckoutDetails({ onNext, onBack }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Enter valid 10-digit phone number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter valid email address';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📦 Delivery Details</h1>
        <p style={styles.subtitle}>Please provide your delivery information</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={{
              ...styles.input,
              ...(errors.fullName ? styles.inputError : {})
            }}
          />
          {errors.fullName && <span style={styles.errorText}>{errors.fullName}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            maxLength="10"
            style={{
              ...styles.input,
              ...(errors.phone ? styles.inputError : {})
            }}
          />
          {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            style={{
              ...styles.input,
              ...(errors.email ? styles.inputError : {})
            }}
          />
          {errors.email && <span style={styles.errorText}>{errors.email}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Delivery Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House No., Building, Street, Landmark"
            rows="3"
            style={{
              ...styles.textarea,
              ...(errors.address ? styles.inputError : {})
            }}
          />
          {errors.address && <span style={styles.errorText}>{errors.address}</span>}
        </div>

        <div style={styles.row}>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.label}>City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Your city"
              style={{
                ...styles.input,
                ...(errors.city ? styles.inputError : {})
              }}
            />
            {errors.city && <span style={styles.errorText}>{errors.city}</span>}
          </div>

          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.label}>Pincode *</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="6-digit pincode"
              maxLength="6"
              style={{
                ...styles.input,
                ...(errors.pincode ? styles.inputError : {})
              }}
            />
            {errors.pincode && <span style={styles.errorText}>{errors.pincode}</span>}
          </div>
        </div>
        
        <div style={styles.buttonGroup}>
          <button type="button" onClick={onBack} style={styles.backButton}>
            Cancel
          </button>
          <button type="submit" style={styles.nextButton}>
            Continue to Payment →
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px 20px',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#7f8c8d',
  },
  form: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
  },
  formGroup: {
    marginBottom: '20px',
  },
  row: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#2c3e50',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '0.85rem',
    marginTop: '5px',
    display: 'block',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '30px',
  },
  backButton: {
    flex: 1,
    padding: '14px',
    background: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  nextButton: {
    flex: 2,
    padding: '14px',
    background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  },
};

export default CheckoutDetails;