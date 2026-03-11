import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>🛍️ Fresh Grocery</h2>
          <p>
            Fresh Grocery delivers vegetables, fruits and daily essentials
            directly to your home with best quality and affordable price.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>🏠 Home</li>
            <li>📦 Products</li>
            <li>🗂️ Categories</li>
            <li>🏷️ Offers</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li>💬 Contact Us</li>
            <li>🚚 Track Order</li>
            <li>↩️ Return Policy</li>
            <li>❓ Help Center</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📍 Chennai, Tamil Nadu</p>
          <p>📞 +91 9876543210</p>
          <p>✉️ grocery@email.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Fresh Grocery | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;