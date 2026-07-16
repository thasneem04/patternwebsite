import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import Logo from '../ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="footer-logo">
              <Logo size={32} />
              <span>PlacementPrep</span>
            </Link>
            <p className="footer-description">
              The ultimate campus placement preparation platform. Get company-specific recruitment patterns, practice MCQs, coding questions, and interview preparation materials all in one place.
            </p>
            <div className="flex gap-md mt-md">
              <a href="#" className="btn-ghost p-sm rounded-full" style={{ color: 'rgba(255,255,255,0.7)' }}><FiTwitter size={20} /></a>
              <a href="#" className="btn-ghost p-sm rounded-full" style={{ color: 'rgba(255,255,255,0.7)' }}><FiLinkedin size={20} /></a>
              <a href="#" className="btn-ghost p-sm rounded-full" style={{ color: 'rgba(255,255,255,0.7)' }}><FiGithub size={20} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Practice</h4>
            <ul className="footer-links">
              <li><Link to="/mcq">MCQ Questions</Link></li>
              <li><Link to="/coding">Coding Practice</Link></li>
              <li><Link to="/companies">Company Patterns</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Top Companies</h4>
            <ul className="footer-links">
              <li><Link to="/companies/tcs">TCS NQT</Link></li>
              <li><Link to="/companies/infosys">Infosys</Link></li>
              <li><Link to="/companies/cognizant">Cognizant</Link></li>
              <li><Link to="/companies/accenture">Accenture</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><a href="mailto:hello@placementprep.com" className="flex items-center gap-sm"><FiMail /> hello@placementprep.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} PlacementPrep. All rights reserved.</p>
          <div className="flex gap-md">
            <Link to="/privacy" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
