import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="row">
          <div className="col-md-6">
            <h3>Contact Us</h3>
            <div className="m-lg-3">
                <p>Email: nguyenhoangloc2208@gmail.com</p>
                <p>Phone: 0332 649 498</p>
            </div>
          </div>
          <div className="col-md-6">
            <h3>Quick Links</h3>
            <ul className="m-lg-3">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shopping</Link></li>
              <li><Link to="/abouts">About Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
