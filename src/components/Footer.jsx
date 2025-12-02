'use client';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Forex Trading', href: '/forex-trading' },
    { name: 'Technical Analysis', href: '/technical-analysis' },
    { name: 'Risk Management', href: '/risk-management' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const subjects = [
    { name: 'Computer Science', href: '/computer-science' },
    { name: 'Mathematics', href: '/mathematics' },
    { name: 'Economics', href: '/economics' },
    { name: 'Business', href: '/business' },
    { name: 'All Subjects', href: '/all-subjects' }
  ];

  const socialLinks = [
    { icon: 'fab fa-twitter', href: '#', color: 'text-info' },
    { icon: 'fab fa-facebook', href: '#', color: 'text-primary' },
    { icon: 'fab fa-linkedin', href: '#', color: 'text-primary' },
    { icon: 'fab fa-instagram', href: '#', color: 'text-danger' },
    { icon: 'fab fa-youtube', href: '#', color: 'text-danger' },
    { icon: 'fab fa-telegram', href: '#', color: 'text-info' }
  ];

  return (
    <footer className="bg-dark text-light pt-5">
      <div className="container">
        <div className="row g-4">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="brand-logo me-2">
                  <i className="fas fa-chart-line text-warning"></i>
                </div>
                <span className="fw-bold fs-3 text-white">BibraFX</span>
              </div>
              <p className="text-light opacity-75 mb-4">
                Your premier destination for forex trading education. Access premium 
                materials, expert strategies, and comprehensive resources to transform 
                your trading journey.
              </p>
              <div className="social-links d-flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`${social.color} social-icon`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-4 text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              {quickLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link href={link.href} className="text-light opacity-75 text-decoration-none footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-4 text-warning">Subjects</h5>
            <ul className="list-unstyled">
              {subjects.map((subject, index) => (
                <li key={index} className="mb-2">
                  <Link href={subject.href} className="text-light opacity-75 text-decoration-none footer-link">
                    {subject.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-4 text-warning">Stay Updated</h5>
            <p className="text-light opacity-75 mb-3">
              Subscribe to get notified about new trading materials and updates.
            </p>
            <div className="newsletter-form">
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email"
                />
                <button className="btn btn-warning" type="button">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-4">
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-envelope text-warning me-3"></i>
                <span className="text-light opacity-75">bibrafx@gmail.com</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-phone text-warning me-3"></i>
                <span className="text-light opacity-75">+250 795564155</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="fas fa-map-marker-alt text-warning me-3"></i>
                <span className="text-light opacity-75">Global Trading Education</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-top border-secondary mt-5 pt-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-light opacity-75 mb-0">
                © {currentYear} BibraFX. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-bottom-links">
                <Link href="/privacy" className="text-light opacity-75 text-decoration-none me-3">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-light opacity-75 text-decoration-none me-3">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-light opacity-75 text-decoration-none">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-link {
          transition: all 0.3s ease;
        }
        
        .footer-link:hover {
          color: var(--accent-gold) !important;
          padding-left: 5px;
        }
        
        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .social-icon:hover {
          background: var(--accent-gold);
          transform: translateY(-3px);
          color: var(--text-dark) !important;
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
        
        .newsletter-form .form-control {
          border-radius: 25px 0 0 25px;
          border: none;
        }
        
        .newsletter-form .btn {
          border-radius: 0 25px 25px 0;
          border: none;
        }
      `}</style>
    </footer>
  );
}