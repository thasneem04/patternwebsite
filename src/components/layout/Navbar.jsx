import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX, FiMoon, FiSun, FiSearch } from 'react-icons/fi';
import Logo from '../ui/Logo';

const Navbar = ({ theme, onToggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Companies', path: '/companies' },
    { name: 'MCQ Practice', path: '/mcq' },
    { name: 'Coding', path: '/coding' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <Logo size={32} />
          <span>PlacementPrep</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={isActive(link.path)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="navbar-actions">
          <button 
            className="btn btn-ghost btn-sm" 
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            style={{ color: 'white', padding: '8px' }}
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          
          <button className="btn btn-primary btn-sm" style={{ display: 'none' /* Will implement login later */ }}>
            Sign In
          </button>

          {/* Mobile Menu Toggle */}
          <div className="hamburger" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX size={24} color="white" /> : <FiMenu size={24} color="white" />}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={isActive(link.path)}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="divider" style={{ margin: '16px 0', borderColor: 'rgba(255,255,255,0.1)' }}></div>
          <Link to="/resources" className={isActive('/resources')} onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
          <Link to="/about" className={isActive('/about')} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className={isActive('/contact')} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
