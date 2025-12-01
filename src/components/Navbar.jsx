'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        {/* Brand Logo */}
        <Link href="/" className="navbar-brand">
          <div className="d-flex align-items-center">
            <div className="brand-logo me-2">
              <i className="fas fa-chart-line text-warning"></i>
            </div>
            <span className="fw-bold fs-3 text-gradient">BibraFX</span>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                <i className="fas fa-home me-2"></i>
                Home
              </Link>
            </li>
            
            {/* Forex Categories Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i className="fas fa-coins me-2"></i>
                Forex Trading
              </a>
              <ul className="dropdown-menu">
                <li><Link href="/forex-trading" className="dropdown-item">All Forex Materials</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link href="/technical-analysis" className="dropdown-item">Technical Analysis</Link></li>
                <li><Link href="/fundamental-analysis" className="dropdown-item">Fundamental Analysis</Link></li>
                <li><Link href="/risk-management" className="dropdown-item">Risk Management</Link></li>
                <li><Link href="/trading-psychology" className="dropdown-item">Trading Psychology</Link></li>
              </ul>
            </li>

            {/* Other Subjects Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i className="fas fa-graduation-cap me-2"></i>
                Other Subjects
              </a>
              <ul className="dropdown-menu">
                <li><Link href="/computer-science" className="dropdown-item">Computer Science</Link></li>
                <li><Link href="/mathematics" className="dropdown-item">Mathematics</Link></li>
                <li><Link href="/economics" className="dropdown-item">Economics</Link></li>
                <li><Link href="/business" className="dropdown-item">Business</Link></li>
                <li><Link href="/all-subjects" className="dropdown-item">View All Subjects</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link href="/about" className="nav-link">
                <i className="fas fa-info-circle me-2"></i>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">
                <i className="fas fa-envelope me-2"></i>
                Contact
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="d-flex align-items-center">
            <div className="input-group search-box">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search documents..." 
              />
              <button className="btn btn-outline-primary" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          padding: 1rem 0;
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        .navbar-scrolled {
          background: rgba(255, 255, 255, 0.98);
          padding: 0.5rem 0;
          box-shadow: 0 4px 30px rgba(0,0,0,0.15);
        }
        
        .brand-logo {
          width: 40px;
          height: 40px;
          background: var(--gradient-primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .brand-logo i {
          font-size: 1.2rem;
          color: white;
        }
        
        .nav-link {
          font-weight: 500;
          color: var(--text-dark) !important;
          transition: all 0.3s ease;
          margin: 0 0.5rem;
        }
        
        .nav-link:hover {
          color: var(--primary-blue) !important;
          transform: translateY(-2px);
        }
        
        .search-box {
          width: 300px;
        }
        
        .search-box input {
          border-radius: 25px 0 0 25px;
          border: 2px solid var(--border-color);
          border-right: none;
        }
        
        .search-box button {
          border-radius: 0 25px 25px 0;
          border: 2px solid var(--primary-blue);
          background: var(--primary-blue);
          color: white;
        }
        
        .search-box button:hover {
          background: var(--secondary-blue);
        }
        
        @media (max-width: 991px) {
          .search-box {
            width: 100%;
            margin-top: 1rem;
          }
        }
      `}</style>
    </nav>
  );
}