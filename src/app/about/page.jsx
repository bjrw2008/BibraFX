'use client';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-vh-100 bg-light pt-5">
      <div className="container mt-5 py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/" className="text-decoration-none">
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              About Us
            </li>
          </ol>
        </nav>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-5">
                  <div className="display-1 mb-3">
                    <i className="fas fa-chart-line text-primary"></i>
                  </div>
                  <h1 className="display-5 fw-bold text-dark mb-3">About BibraFX</h1>
                  <p className="lead text-muted">
                    Your Premier Forex Trading Education Platform
                  </p>
                </div>

                <div className="about-content">
                  <h3 className="fw-bold text-dark mb-4">Our Mission</h3>
                  <p className="text-muted mb-4">
                    At BibraFX, we are dedicated to providing high-quality forex trading education 
                    to traders of all levels. Our mission is to democratize access to premium trading 
                    knowledge and help individuals develop the skills needed to succeed in the 
                    financial markets.
                  </p>

                  <h3 className="fw-bold text-dark mb-4">What We Offer</h3>
                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <div className="d-flex align-items-start">
                        <div className="feature-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                             style={{width: '50px', height: '50px'}}>
                          <i className="fas fa-graduation-cap"></i>
                        </div>
                        <div>
                          <h5 className="fw-bold text-dark mb-2">Comprehensive Education</h5>
                          <p className="text-muted mb-0">
                            From beginner basics to advanced trading strategies
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="d-flex align-items-start">
                        <div className="feature-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                             style={{width: '50px', height: '50px'}}>
                          <i className="fas fa-file-pdf"></i>
                        </div>
                        <div>
                          <h5 className="fw-bold text-dark mb-2">Quality Resources</h5>
                          <p className="text-muted mb-0">
                            Curated collection of trading materials and guides
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="fw-bold text-dark mb-4">Our Team</h3>
                  <p className="text-muted mb-4">
                    Our team consists of experienced traders, financial educators, and technology 
                    experts who are passionate about sharing their knowledge. We combine practical 
                    trading experience with modern educational approaches to create effective 
                    learning resources.
                  </p>

                  <div className="cta-section text-center mt-5 pt-4 border-top">
                    <h4 className="fw-bold text-dark mb-3">Start Your Trading Journey</h4>
                    <p className="text-muted mb-4">
                      Join thousands of successful traders who have transformed their skills with BibraFX
                    </p>
                    <Link href="/forex-trading" className="btn btn-primary btn-lg px-5">
                      <i className="fas fa-rocket me-2"></i>
                      Explore Learning Materials
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}