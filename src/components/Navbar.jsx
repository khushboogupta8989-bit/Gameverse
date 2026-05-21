import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
// THIS IS THE FIX - Import icons from react-icons, NOT react-router-dom:
import { FaBars, FaTimes, FaUserCircle, FaGamepad, FaBell, FaCaretDown } from 'react-icons/fa';

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/games', label: 'Games' },
    { path: '/tournaments', label: 'Tournaments' },
    { path: '/community', label: 'Community' },
    { path: '/leaderboard', label: 'Ranks' },
  ];

  const moreLinks = [
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'News' },
    { path: '/quiz', label: 'Quiz' },
    { path: '/contact', label: 'Support' },
  ];

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/login');
    setIsProfileOpen(false);
  };

  return (
    <nav className="navbar-cyber">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <FaGamepad className="logo-icon" />
          <span className="logo-text">Game<span>Verse</span></span>
        </Link>

        {/* Center Links */}
        <div className="nav-center">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              {link.label}
            </NavLink>
          ))}
          
          <div className="nav-dropdown">
            <button className="dropdown-btn">More <FaCaretDown /></button>
            <div className="dropdown-menu-cyber">
              {moreLinks.map((link) => (
                <NavLink key={link.path} to={link.path} className="dropdown-item" onClick={closeMenu}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="nav-right">
          {user ? (
            <div className="user-area">
              
              
              <div className="profile-menu-wrapper">
                <button className="profile-btn" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  {(() => {
                    const gv = JSON.parse(localStorage.getItem('gv_profile') || '{}');
                    const hasValidAvatar = gv.avatar && gv.username === user.username;
                    return hasValidAvatar ? (
                      <img src={gv.avatar} alt="avatar" style={{width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #8b5cf6'}} />
                    ) : (
                      <FaUserCircle size={34} color="#8b5cf6" />
                    );
                  })()}
                  <span>{user.username}</span>
                  <FaCaretDown />
                </button>
                
                {isProfileOpen && (
                  <div className="profile-dropdown-cyber">
                    <div className="dropdown-header">
                      <h4>Welcome back,</h4>
                      <span>{user.username}</span>
                    </div>
                    <div className="dropdown-body">
                      <Link to="/profile" onClick={() => setIsProfileOpen(false)}><FaUserCircle /> My Profile</Link>
                      <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="auth-area">
              <Link to="/login" className="login-btn-main">Login</Link>
            </div>
          )}

          <div className="hamburger-cyber" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu-cyber ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-links">
          {navLinks.map(link => (
            <NavLink key={link.path} to={link.path} className="mobile-link" onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
          <div className="mobile-divider"></div>
          {moreLinks.map(link => (
             <NavLink key={link.path} to={link.path} className="mobile-link sub" onClick={closeMenu}>
               {link.label}
             </NavLink>
          ))}
        </div>
        <div className="mobile-auth">
          {user ? (
             <button onClick={handleLogout} className="mob-logout">Logout</button>
          ) : (
             <Link to="/login" className="mob-login" onClick={closeMenu}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;