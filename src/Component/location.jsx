import React from "react";


function ShopLocation() {
  return (
    <div className="location-section">

      <div className="location-box">

        <h2 className="location-title">
          🏬 Grocery Point - Shop Address
        </h2>

        <div className="location-info">

          <p className="label">📍 Address:</p>

          <p>No. 45, Main Street,</p>
          <p>Anna Nagar, Chennai - 600040</p>
          <p>Tamil Nadu, India</p>

          <p className="label">📞 Phone:</p>

          <p>+91 98765 43210</p>

          <p className="label">🕒 Working Hours:</p>

          <p>Mon - Sun: 8:00 AM - 9:00 PM</p>

        </div>

        <div className="map">
          <iframe
            title="shop-map"
            src="https://www.google.com/maps?q=anna+nagar+chennai&output=embed"
            loading="lazy"
          ></iframe>
        </div>

      </div>

    </div>
  );
}

export default ShopLocation;