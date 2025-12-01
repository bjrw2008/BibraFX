'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllDocuments } from '@/lib/firestore';

export default function ForexTradingPage() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(() => {
    async function loadForexDocuments() {
      try {
        // Load documents from all forex-related categories
        const categories = ['forex-trading', 'technical-analysis', 'fundamental-analysis', 'risk-management', 'trading-psychology'];
        const allPromises = categories.map(category => getAllDocuments(category));
        const results = await Promise.all(allPromises);
        
        // Combine all documents with their category
        let allDocs = [];
        results.forEach((docs, index) => {
          const categoryDocs = docs.map(doc => ({
            ...doc,
            subjectArea: categories[index]
          }));
          allDocs = [...allDocs, ...categoryDocs];
        });

        setDocuments(allDocs);
        setFilteredDocs(allDocs);

        // Update counts for each category
        const updatedCategories = forexCategories.map(cat => {
          if (cat.id === 'all') {
            return { ...cat, count: allDocs.length };
          }
          const count = allDocs.filter(doc => doc.subjectArea === cat.id).length;
          return { ...cat, count };
        });
        
        // Update categories state (we'll use this for display)
        setForexCategories(updatedCategories);
      } catch (error) {
        console.error('Error loading forex documents:', error);
      } finally {
        setLoading(false);
      }
    }

    loadForexDocuments();
  }, []);

  // Filter documents based on active filter and search term
  useEffect(() => {
    let filtered = documents;

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(doc => doc.subjectArea === activeFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(term) ||
        doc.description.toLowerCase().includes(term) ||
        (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(term))) ||
        (doc.author && doc.author.toLowerCase().includes(term))
      );
    }

    setFilteredDocs(filtered);
  }, [activeFilter, searchTerm, documents]);

  const [forexCategories, setForexCategories] = useState([
    {
      id: 'all',
      name: 'All Forex',
      icon: 'fas fa-coins',
      description: 'Complete forex trading collection',
      count: 0
    },
    {
      id: 'forex-trading',
      name: 'Forex Basics',
      icon: 'fas fa-chart-line',
      description: 'Fundamental trading concepts',
      count: 0
    },
    {
      id: 'technical-analysis',
      name: 'Technical Analysis',
      icon: 'fas fa-chart-bar',
      description: 'Charts, patterns & indicators',
      count: 0
    },
    {
      id: 'fundamental-analysis',
      name: 'Fundamental Analysis',
      icon: 'fas fa-globe-americas',
      description: 'Economic factors & news',
      count: 0
    },
    {
      id: 'risk-management',
      name: 'Risk Management',
      icon: 'fas fa-shield-alt',
      description: 'Money management strategies',
      count: 0
    },
    {
      id: 'trading-psychology',
      name: 'Trading Psychology',
      icon: 'fas fa-brain',
      description: 'Mindset & discipline',
      count: 0
    }
  ]);

  return (
    <div className="min-vh-100 bg-light pt-5">
      {/* Header Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/" className="text-white text-decoration-none">
                      <i className="fas fa-home me-1"></i>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">
                    Forex Trading
                  </li>
                </ol>
              </nav>
              <h1 className="display-5 fw-bold mb-3">
                Forex Trading Education
              </h1>
              <p className="lead mb-4 opacity-75">
                Master currency trading with our comprehensive collection of expert materials, 
                strategies, and educational resources for traders of all levels.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="badge bg-warning text-dark">
                  <i className="fas fa-star me-1"></i>
                  Premium Content
                </span>
                <span className="badge bg-light text-dark">
                  <i className="fas fa-clock me-1"></i>
                  Updated Regularly
                </span>
                <span className="badge bg-light text-dark">
                  <i className="fas fa-users me-1"></i>
                  Expert Approved
                </span>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <div className="forex-hero-icon">
                <i className="fas fa-chart-line display-1 text-warning"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="py-4 bg-white border-bottom">
        <div className="container">
          <div className="row g-3">
            {forexCategories.map((category) => (
              <div key={category.id} className="col-6 col-md-4 col-lg-2">
                <button
                  className={`category-btn w-100 text-start p-3 border-0 rounded-3 ${
                    activeFilter === category.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  <div className="d-flex align-items-center mb-2">
                    <i className={`${category.icon} fa-lg me-2 ${activeFilter === category.id ? 'text-warning' : 'text-primary'}`}></i>
                    <span className="fw-bold">{category.name}</span>
                  </div>
                  <small className="text-muted d-block">{category.description}</small>
                  <span className="badge bg-secondary mt-1">{category.count}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4 bg-white">
        <div className="container">
          <div className="row g-3 align-items-center">
            <div className="col-md-6">
              <div className="search-box position-relative">
                <i className="fas fa-search position-absolute top-50 start-3 translate-middle-y text-muted"></i>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search forex documents, strategies, indicators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option>Sort by: Newest</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Title</option>
                <option>Sort by: Difficulty</option>
              </select>
            </div>
            <div className="col-md-3">
              <div className="text-md-end">
                <span className="text-muted">
                  Showing {filteredDocs.length} of {documents.length} documents
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-5">
        <div className="container">
          {loading ? (
            <div className="row">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="col-md-6 col-lg-4 mb-4">
                  <div className="card placeholder-glow h-100">
                    <div className="card-body">
                      <div className="placeholder col-7 mb-3" style={{height: '20px'}}></div>
                      <div className="placeholder col-10 mb-2" style={{height: '16px'}}></div>
                      <div className="placeholder col-8 mb-2" style={{height: '16px'}}></div>
                      <div className="placeholder col-12" style={{height: '100px'}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-search display-1 text-muted mb-4"></i>
              <h3 className="text-dark mb-3">No documents found</h3>
              <p className="text-muted mb-4">
                {searchTerm ? `No results for "${searchTerm}"` : 'No documents available in this category'}
              </p>
              {searchTerm && (
                <button 
                  className="btn btn-primary"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="row g-4">
                {filteredDocs.map((document) => (
                  <div key={document.id} className="col-md-6 col-lg-4">
                    <ForexDocumentCard document={document} />
                  </div>
                ))}
              </div>
              
              {/* Load More Button */}
              {filteredDocs.length > 9 && (
                <div className="text-center mt-5">
                  <button className="btn btn-outline-primary btn-lg">
                    <i className="fas fa-redo me-2"></i>
                    Load More Documents
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Educational Path Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h1 fw-bold text-dark mb-3">
              Start Your <span className="text-primary">Forex Journey</span>
            </h2>
            <p className="lead text-muted">Follow our recommended learning path</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center p-4">
                <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{width: '60px', height: '60px'}}>
                  <span className="fw-bold">1</span>
                </div>
                <h5 className="fw-bold text-dark mb-3">Learn Basics</h5>
                <p className="text-muted">
                  Start with fundamental concepts, terminology, and market structure
                </p>
                <Link href="/forex-trading?filter=forex-trading" className="btn btn-outline-primary btn-sm">
                  Begin Here
                </Link>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center p-4">
                <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{width: '60px', height: '60px'}}>
                  <span className="fw-bold">2</span>
                </div>
                <h5 className="fw-bold text-dark mb-3">Technical Skills</h5>
                <p className="text-muted">
                  Master chart analysis, indicators, and technical strategies
                </p>
                <Link href="/forex-trading?filter=technical-analysis" className="btn btn-outline-primary btn-sm">
                  Learn Technicals
                </Link>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center p-4">
                <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{width: '60px', height: '60px'}}>
                  <span className="fw-bold">3</span>
                </div>
                <h5 className="fw-bold text-dark mb-3">Advanced Strategies</h5>
                <p className="text-muted">
                  Develop risk management and advanced trading systems
                </p>
                <Link href="/forex-trading?filter=risk-management" className="btn btn-outline-primary btn-sm">
                  Advanced Topics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .category-btn {
          background: #f8f9fa;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .category-btn:hover {
          background: #e9ecef;
          transform: translateY(-2px);
        }
        
        .category-btn.active {
          background: var(--primary-blue);
          color: white;
          border-color: var(--primary-blue);
        }
        
        .category-btn.active .text-muted {
          color: rgba(255,255,255,0.8) !important;
        }
        
        .forex-hero-icon {
          animation: float 3s ease-in-out infinite;
        }
        
        .search-box input {
          border-radius: 25px;
          padding-left: 2.5rem;
        }
        
        .step-number {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}

// Forex Document Card Component
function ForexDocumentCard({ document }) {
  const getDifficultyBadge = (difficulty) => {
    const styles = {
      beginner: { class: 'bg-success', text: 'Beginner' },
      intermediate: { class: 'bg-warning text-dark', text: 'Intermediate' },
      advanced: { class: 'bg-danger', text: 'Advanced' },
      expert: { class: 'bg-dark', text: 'Expert' }
    };
    return styles[difficulty] || { class: 'bg-secondary', text: 'All Levels' };
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'forex-trading': 'fas fa-coins',
      'technical-analysis': 'fas fa-chart-line',
      'fundamental-analysis': 'fas fa-globe-americas',
      'risk-management': 'fas fa-shield-alt',
      'trading-psychology': 'fas fa-brain'
    };
    return icons[category] || 'fas fa-file-alt';
  };

  const difficulty = getDifficultyBadge(document.difficulty);

  return (
    <div className="card card-hover h-100 border-0 shadow-sm">
      {document.thumbnailUrl ? (
        <img 
          src={document.thumbnailUrl} 
          className="card-img-top" 
          alt={document.title}
          style={{height: '200px', objectFit: 'cover'}}
        />
      ) : (
        <div className="card-img-top bg-gradient text-white d-flex align-items-center justify-content-center" 
             style={{height: '200px'}}>
          <i className={`${getCategoryIcon(document.subjectArea)} display-4`}></i>
        </div>
      )}
      
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge bg-primary">
            <i className={`${getCategoryIcon(document.subjectArea)} me-1`}></i>
            {document.subjectArea?.replace('-', ' ')}
          </span>
          <span className={`badge ${difficulty.class}`}>
            {difficulty.text}
          </span>
        </div>
        
        <h5 className="card-title fw-bold text-dark mb-3 line-clamp-2" style={{minHeight: '48px'}}>
          {document.title}
        </h5>
        
        <p className="card-text text-muted flex-grow-1 mb-3 small line-clamp-3">
          {document.description}
        </p>
        
        {/* Document Metadata */}
        <div className="document-meta mb-3">
          <div className="row g-2 small text-muted">
            {document.author && (
              <div className="col-12">
                <i className="fas fa-user me-1"></i>
                {document.author}
              </div>
            )}
            {document.pages && (
              <div className="col-6">
                <i className="fas fa-file me-1"></i>
                {document.pages} pages
              </div>
            )}
            {document.rating && (
              <div className="col-6">
                <i className="fas fa-star text-warning me-1"></i>
                {document.rating}/5
              </div>
            )}
          </div>
        </div>
        
        {/* Tags */}
        {document.tags && document.tags.length > 0 && (
          <div className="mb-3">
            <div className="d-flex flex-wrap gap-1">
              {document.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="badge bg-light text-dark border small">
                  {tag}
                </span>
              ))}
              {document.tags.length > 3 && (
                <span className="badge bg-light text-dark border small">
                  +{document.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="d-flex gap-2 mt-auto">
          <Link 
            href={`/${document.subjectArea}/${document.slug}`}
            className="btn btn-primary flex-fill"
          >
            <i className="fas fa-book-open me-2"></i>
            Read
          </Link>
          <button className="btn btn-outline-secondary">
            <i className="fas fa-bookmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}