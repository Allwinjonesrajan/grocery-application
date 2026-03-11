import React, { useState, useEffect } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

function ContactPage() {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormStatus(''), 5000);
  };

  const businessHours = [
    { day: 'Monday',    hours: '8:00 AM - 10:00 PM' },
    { day: 'Tuesday',   hours: '8:00 AM - 10:00 PM' },
    { day: 'Wednesday', hours: '8:00 AM - 10:00 PM' },
    { day: 'Thursday',  hours: '8:00 AM - 10:00 PM' },
    { day: 'Friday',    hours: '8:00 AM - 11:00 PM' },
    { day: 'Saturday',  hours: '9:00 AM - 11:00 PM' },
    { day: 'Sunday',    hours: '9:00 AM - 9:00 PM'  },
  ];

  return (
    <div style={styles.container}>

      <div style={styles.content}>

        <div style={{
          ...styles.infoGrid,
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        }}>
          {[
            {
              icon: '📍', title: 'Visit Us',
              lines: ['123 Grocery Street', 'Foodie Nagar, Mumbai', 'Maharashtra - 400001']
            },
            {
              icon: '📞', title: 'Call Us',
              lines: ['+91 98765 43210', '+91 98765 43211', '24/7 Customer Support']
            },
            {
              icon: '✉️', title: 'Email Us',
              lines: ['support@groceryapp.com', 'orders@groceryapp.com', 'careers@groceryapp.com']
            },
          ].map((card, i) => (
            <div key={i} style={styles.infoCard}>
              <div style={styles.infoIcon}>{card.icon}</div>
              <h3 style={styles.infoTitle}>{card.title}</h3>
              {card.lines.map((line, j) => (
                <p key={j} style={styles.infoText}>{line}</p>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          ...styles.mapHoursSection,
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '20px' : '30px',
        }}>
          <div style={{ ...styles.mapContainer, height: isMobile ? '250px' : '400px' }}>
            <iframe
              title="Shop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.555919829583!2d72.8684141!3d19.0760983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8f2f8f8f8f8%3A0x8f8f8f8f8f8f8f8f!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              style={styles.map}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div style={styles.hoursContainer}>
            <h2 style={{ ...styles.hoursTitle, fontSize: isMobile ? '1.4rem' : '1.8rem' }}>
              🕒 Business Hours
            </h2>
            <div style={styles.hoursList}>
              {businessHours.map((item, i) => (
                <div key={i} style={{
                  ...styles.hoursRow,
                  flexDirection: isMobile ? 'row' : 'row',
                  padding: isMobile ? '10px 0' : '12px 0',
                }}>
                  <span style={styles.hoursDay}>{item.day}</span>
                  <span style={styles.hoursTime}>{item.hours}</span>
                </div>
              ))}
            </div>
            <div style={styles.specialNote}>
              <p> Special delivery hours available on request</p>
              <p>🚚 Free delivery within 5km radius</p>
            </div>
          </div>
        </div>

        <div style={{
          ...styles.formSection,
          padding: isMobile ? '20px 16px' : '40px',
        }}>
          <h2 style={{ ...styles.formTitle, fontSize: isMobile ? '1.5rem' : '2rem' }}>
            Send Us a Message
          </h2>

          {formStatus && (
            <div style={styles.successMessage}>{formStatus}</div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>

            <div style={{
              ...styles.formGrid,
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '0' : '20px',
            }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Name *</label>
                <input
                  type="text" name="name" value={formData.name}
                  onChange={handleChange} style={styles.input}
                  placeholder="Enter your full name" required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  type="email" name="email" value={formData.email}
                  onChange={handleChange} style={styles.input}
                  placeholder="Enter your email" required
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <input
                type="text" name="subject" value={formData.subject}
                onChange={handleChange} style={styles.input}
                placeholder="What is this about?"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Message *</label>
              <textarea
                name="message" value={formData.message}
                onChange={handleChange} style={styles.textarea}
                placeholder="Write your message here..."
                rows="5" required
              />
            </div>

            <button type="submit" style={styles.submitBtn}>
              Send Message 
            </button>
          </form>
        </div>

        <div style={styles.socialSection}>
          <h3 style={styles.socialTitle}>Follow Us</h3>
          <div style={styles.socialIcons}>
            {['📘', '📷', '🐦', '📱', '💼'].map((icon, i) => (
              <a key={i} href="/" style={styles.socialIcon}>{icon}</a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  hero: {
    background: 'linear-gradient(135deg, #2d6cdf 0%, #1a57c8 100%)',
    textAlign: 'center',
    color: 'white',
  },
  heroTitle: {
    marginBottom: '12px',
    fontWeight: 'bold',
  },
  heroSubtitle: {
    opacity: 0.9,
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 16px',
  },
  infoGrid: {
    display: 'grid',
    gap: '20px',
    marginBottom: '40px',
  },
  infoCard: {
    backgroundColor: 'white',
    padding: '28px 20px',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
  },
  infoIcon: {
    fontSize: '2.5rem',
    marginBottom: '12px',
  },
  infoTitle: {
    fontSize: '1.2rem',
    color: '#2c3e50',
    marginBottom: '12px',
    fontWeight: '700',
  },
  infoText: {
    color: '#7f8c8d',
    lineHeight: '1.8',
    fontSize: '0.95rem',
  },
  mapHoursSection: {
    display: 'grid',
    marginBottom: '40px',
  },
  mapContainer: {
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  },
  map: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  hoursContainer: {
    backgroundColor: 'white',
    padding: '24px 20px',
    borderRadius: '15px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
  },
  hoursTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '12px',
  },
  hoursList: {
    marginBottom: '16px',
  },
  hoursRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px dashed #e0e0e0',
  },
  hoursDay: {
    fontWeight: '600',
    color: '#34495e',
    fontSize: '0.95rem',
  },
  hoursTime: {
    color: '#27ae60',
    fontWeight: '500',
    fontSize: '0.9rem',
  },
  specialNote: {
    backgroundColor: '#f8f9fa',
    padding: '14px',
    borderRadius: '10px',
    marginTop: '16px',
    color: '#7f8c8d',
    fontSize: '0.88rem',
    lineHeight: '1.8',
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
    marginBottom: '40px',
  },
  formTitle: {
    color: '#2c3e50',
    marginBottom: '24px',
    textAlign: 'center',
    fontWeight: '700',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '14px',
    borderRadius: '10px',
    marginBottom: '20px',
    textAlign: 'center',
    border: '1px solid #c3e6cb',
    fontSize: '0.95rem',
  },
  form: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  formGrid: {
    display: 'grid',
    marginBottom: '0',
  },
  formGroup: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    marginBottom: '7px',
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '0.95rem',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none',
    boxSizing: 'border-box',
  },
  submitBtn: {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #2d6cdf, #1a57c8)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.05rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(45,108,223,0.3)',
  },
  socialSection: {
    textAlign: 'center',
    paddingBottom: '20px',
  },
  socialTitle: {
    fontSize: '1.4rem',
    color: '#2c3e50',
    marginBottom: '16px',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  socialIcon: {
    display: 'inline-flex',
    width: '50px',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '50%',
    fontSize: '1.4rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textDecoration: 'none',
  },
};

export default ContactPage;