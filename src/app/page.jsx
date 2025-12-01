'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllDocuments } from '@/lib/firestore';

export default function Home() {
  const [featuredDocs, setFeaturedDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [forexDocs, technicalDocs] = await Promise.all([
          getAllDocuments('forex-trading'),
          getAllDocuments('technical-analysis')
        ]);

        const featured = [
          ...forexDocs.slice(0, 3),
          ...technicalDocs.slice(0, 2)
        ];

        setFeaturedDocs(featured);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  const stats = [
    { number: '500+', label: 'Trading Documents', icon: 'fas fa-file-pdf' },
    { number: '50+', label: 'Expert Strategies', icon: 'fas fa-chess-queen' },
    { number: '1K+', label: 'Active Learners', icon: 'fas fa-users' },
    { number: '24/7', label: 'Available Resources', icon: 'fas fa-clock' }
  ];

  const features = [
    {
      icon: 'fas fa-chart-line',
      title: 'Technical Analysis',
      description: 'Master chart patterns, indicators, and market structure'
    },
    {
      icon: 'fas fa-globe-americas',
      title: 'Fundamental Analysis',
      description: 'Understand economic factors driving currency markets'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Risk Management',
      description: 'Learn proper position sizing and risk control'
    },
    {
      icon: 'fas fa-brain',
      title: 'Trading Psychology',
      description: 'Develop the mindset of successful traders'
    }
  ];

  return (
    <div className="min-vh-100">
      {/* Fixed Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content text-white">
                <h1 className="fw-bold mb-3">
                  Master Forex Trading with{' '}
                  <span className="text-warning">BibraFX</span>
                </h1>
                <p className="lead mb-4">
                  Access premium trading materials, expert strategies, and comprehensive 
                  educational resources to transform your trading journey.
                </p>
                <div className="hero-buttons d-flex flex-wrap gap-3">
                  <Link href="/forex-trading" className="btn btn-warning btn-lg px-4 py-2 fw-bold">
                    <i className="fas fa-coins me-2"></i>
                    Start Learning
                  </Link>
                  <Link href="/all-subjects" className="btn btn-outline-light btn-lg px-4 py-2">
                    <i className="fas fa-graduation-cap me-2"></i>
                    Browse All
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="floating-cards">
                <div className="card card-1">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <div className="card card-2">
                  <i className="fas fa-book"></i>
                </div>
                <div className="card card-3">
                  <i className="fas fa-trophy"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-md-3 text-center">
                <div className="stat-card">
                  <i className={`${stat.icon} display-4 text-primary mb-3`}></i>
                  <h3 className="fw-bold text-dark">{stat.number}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h1 fw-bold text-dark mb-3">
              What You'll <span className="text-primary">Learn</span>
            </h2>
            <p className="lead text-muted">Comprehensive trading education</p>
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="feature-card text-center p-4 card-hover">
                  <div className="feature-icon mb-4">
                    <i className={feature.icon}></i>
                  </div>
                  <h5 className="fw-bold text-dark mb-3">{feature.title}</h5>
                  <p className="text-muted small">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Documents */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
              <h2 className="h1 fw-bold text-dark mb-2">
                Featured <span className="text-primary">Documents</span>
              </h2>
              <p className="text-muted">Handpicked trading materials</p>
            </div>
            <Link href="/forex-trading" className="btn btn-outline-primary">
              View All <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
          
          {loading ? (
            <div className="row">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="col-md-4">
                  <div className="card placeholder-glow">
                    <div className="card-body">
                      <div className="placeholder col-6 mb-3" style={{height: '20px'}}></div>
                      <div className="placeholder col-8 mb-2" style={{height: '16px'}}></div>
                      <div className="placeholder col-10" style={{height: '16px'}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="row g-4">
              {featuredDocs.slice(0, 3).map((doc) => (
                <div key={doc.id} className="col-md-4">
                  <DocumentCard document={doc} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="h1 fw-bold mb-4">
                Ready to Transform Your Trading?
              </h2>
              <p className="lead mb-4 opacity-75">
                Join thousands of successful traders who elevated their skills with BibraFX
              </p>
              <Link href="/forex-trading" className="btn btn-warning btn-lg px-5 py-3">
                <i className="fas fa-rocket me-2"></i>
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Document Card Component
function DocumentCard({ document }) {
  const getCategoryIcon = (category) => {
    const icons = {
      'forex-trading': 'fas fa-coins',
      'technical-analysis': 'fas fa-chart-line',
      'fundamental-analysis': 'fas fa-globe-americas',
      'risk-management': 'fas fa-shield-alt',
      'trading-psychology': 'fas fa-brain',
      'computer-science': 'fas fa-laptop-code',
      'mathematics': 'fas fa-calculator'
    };
    return icons[category] || 'fas fa-file-alt';
  };

  return (
    <div className="card card-hover h-100 border-0 shadow-sm">
      {document.thumbnailUrl ? (
        <img 
          src={document.thumbnailUrl} 
          className="card-img-top" 
          alt={document.title}
          style={{height: '180px', objectFit: 'cover'}}
        />
      ) : (
        <div className="card-img-top bg-light d-flex align-items-center justify-content-center" 
             style={{height: '180px'}}>
          <i className="fas fa-file-pdf display-4 text-muted"></i>
        </div>
      )}
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <span className="badge bg-primary text-white">
            <i className={`${getCategoryIcon(document.subjectArea)} me-1`}></i>
            {document.subjectArea?.replace('-', ' ') || 'Document'}
          </span>
          {document.rating && (
            <small className="text-warning">
              <i className="fas fa-star"></i> {document.rating}
            </small>
          )}
        </div>
        
        <h5 className="card-title fw-bold text-dark mb-3">{document.title}</h5>
        
        <p className="card-text text-muted flex-grow-1 mb-3 small">
          {document.description?.substring(0, 100)}...
        </p>
        
        <div className="document-meta mb-3">
          <small className="text-muted">
            <i className="fas fa-user me-1"></i> 
            {document.author || 'Unknown Author'}
            {document.pages && (
              <> · <i className="fas fa-file me-1"></i> {document.pages}p</>
            )}
          </small>
        </div>
        
        <div className="mt-auto">
          <Link 
            href={`/${document.subjectArea}/${document.slug}`}
            className="btn btn-primary w-100"
          >
            <i className="fas fa-book-open me-2"></i>
            Read Document
          </Link>
        </div>
      </div>
    </div>
  );
}