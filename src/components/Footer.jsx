import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaDiscord, FaTwitter, FaYoutube, FaTwitch, FaHeart, FaGamepad, FaPaperPlane } from 'react-icons/fa';

const Footer = ({ onSubscribe }) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubscribe) onSubscribe(email);
    setEmail('');
    alert("Subscribed successfully!");
  };

  return (
    <footer className="footer-cyber">
      {/* 3D Perspective Grid Background */}
      <div className="footer-grid-bg"></div>
      
      {/* Top Neon Border with Animation */}
      <div className="footer-top-border"></div>

      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <FaGamepad /> <span>GameVerse</span>
            </Link>
            <p className="footer-desc">
              The ultimate destination for gamers. Connect, compete, and conquer the leaderboards with our global community.
            </p>
            <div className="socials">
              <a href="https://discord.gg/8XVpQm28FH" target="_blank" rel="noopener noreferrer" className="sc-icon discord"><FaDiscord /></a>
              <a href="https://twitter.com/officialxgameverse" target="_blank" rel="noopener noreferrer" className="sc-icon twitter"><FaTwitter /></a>
              <a href="https://youtube.com/@officialxgameverse" target="_blank" rel="noopener noreferrer" className="sc-icon youtube"><FaYoutube /></a>
              <a href="https://twitch.tv/officialxgameverse" target="_blank" rel="noopener noreferrer" className="sc-icon twitch"><FaTwitch /></a>
            </div>
          </div>

          {/* Links Section 1 */}
          <div className="footer-col">
            <h3 className="col-title">Explore</h3>
            <ul className="col-links">
              <li><Link to="/games">Browse Games</Link></li>
              <li><Link to="/tournaments">Tournaments</Link></li>
              <li><Link to="/leaderboard">Rankings</Link></li>
              <li><Link to="/community">Forums</Link></li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div className="footer-col">
            <h3 className="col-title">Support</h3>
            <ul className="col-links">
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">Help Center</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h3 className="col-title">Newsletter</h3>
            <p>Subscribe for updates. No spam.</p>
            <form className="newsletter-box" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit"><FaPaperPlane /></button>
            </form>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {currentYear} GameVerse. All Rights Reserved.</p>
          <p>Crafted with <FaHeart className="heart" /> for Gamers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;