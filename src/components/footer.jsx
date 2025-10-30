import React from "react";
import { Helmet } from "react-helmet";

function Footer() {
  return (
    <>
      <Helmet>
        <title>GadgetStore - Your One Stop Tech Shop</title>
        <meta
          name="description"
          content="Shop the latest electronics, gadgets, and smart devices at the best prices only at GadgetStore."
        />
        <meta
          name="keywords"
          content="gadgets, electronics, smart devices, tech store, online shopping"
        />
        <meta name="author" content="GadgetStore" />
      </Helmet>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <footer className="footer">
        <div className="footer-container">
          {/* Brand Section */}
          <div className="footer-section">
            <h3>GadgetStore</h3>
            <p>
              Your one-stop shop for the latest in tech, electronics, and smart
              living gadgets.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Deals</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: support@gadgetstore.com</p>
            <p>Phone: +91 87691 92408</p>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; 2025 GadgetStore. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export { Footer };
