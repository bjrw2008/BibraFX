'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PDFViewer from '@/components/PDFViewer';
import ShareButton from '@/components/ShareButton';
import { getDocBySlug, getRelatedDocuments } from '@/lib/firestore';

export default function DocumentDetailPage() {
  const params = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedDocs, setRelatedDocs] = useState([]);

  useEffect(() => {
    async function loadDocument() {
      try {
        const docData = await getDocBySlug(params.subject, params.slug);
        setDocument(docData);
        
        // Load related documents
        if (docData) {
          const related = await getRelatedDocuments(docData.subjectArea, docData.tags);
          setRelatedDocs(related.slice(0, 3)); // Show only 3 related docs
        }
      } catch (error) {
        console.error('Error loading document:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.subject && params.slug) {
      loadDocument();
    }
  }, [params.subject, params.slug]);

  if (loading) {
    return <DocumentLoadingSkeleton />;
  }

  if (!document) {
    return <DocumentNotFound />;
  }

  return (
    <div className="min-vh-100 bg-light pt-5">
      <div className="container mt-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/" className="text-decoration-none">
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href={`/${document.subjectArea}`} className="text-decoration-none">
                {document.subjectArea?.replace(/-/g, ' ') || 'Documents'}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {document.title}
            </li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Main Content */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-0 py-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1 me-3">
                    <h1 className="h2 fw-bold text-dark mb-2">{document.title}</h1>
                    <p className="text-muted lead mb-0">{document.description}</p>
                  </div>
                  <ShareButton document={document} size="lg" />
                </div>
              </div>
              
              <div className="card-body p-0">
                <PDFViewer pdfURL={document.pdfUrl} />
              </div>
            </div>

            {/* Document Actions */}
            <div className="card shadow-sm border-0 mt-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4 text-center">
                    <button className="btn btn-outline-primary w-100">
                      <i className="fas fa-bookmark me-2"></i>
                      Save for Later
                    </button>
                  </div>
                  <div className="col-md-4 text-center">
                    <button className="btn btn-outline-success w-100">
                      <i className="fas fa-download me-2"></i>
                      Download Summary
                    </button>
                  </div>
                  <div className="col-md-4 text-center">
                    <button className="btn btn-outline-info w-100">
                      <i className="fas fa-print me-2"></i>
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <DocumentSidebar document={document} relatedDocs={relatedDocs} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Document Sidebar Component
function DocumentSidebar({ document, relatedDocs }) {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'success',
      intermediate: 'warning',
      advanced: 'danger',
      expert: 'dark'
    };
    return colors[difficulty] || 'secondary';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'forex-trading': 'fas fa-coins',
      'technical-analysis': 'fas fa-chart-line',
      'fundamental-analysis': 'fas fa-globe-americas',
      'risk-management': 'fas fa-shield-alt',
      'trading-psychology': 'fas fa-brain',
      'computer-science': 'fas fa-laptop-code',
      'mathematics': 'fas fa-calculator',
      'economics': 'fas fa-chart-bar',
      'business': 'fas fa-briefcase'
    };
    return icons[category] || 'fas fa-file-alt';
  };

  return (
    <div className="sidebar-sticky">
      {/* Document Info Card */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-4">
            <i className="fas fa-info-circle text-primary me-2"></i>
            Document Information
          </h5>
          
          <div className="space-y-3">
            {/* Category */}
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">Category:</span>
              <span className="badge bg-primary">
                <i className={`${getCategoryIcon(document.subjectArea)} me-1`}></i>
                {document.subjectArea?.replace(/-/g, ' ')}
              </span>
            </div>
            
            {/* Difficulty */}
            {document.difficulty && (
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Difficulty:</span>
                <span className={`badge bg-${getDifficultyColor(document.difficulty)}`}>
                  {document.difficulty.charAt(0).toUpperCase() + document.difficulty.slice(1)}
                </span>
              </div>
            )}
            
            {/* Author */}
            {document.author && (
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Author:</span>
                <span className="fw-medium">{document.author}</span>
              </div>
            )}
            
            {/* Pages */}
            {document.pages && (
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Pages:</span>
                <span>{document.pages}</span>
              </div>
            )}
            
            {/* File Size */}
            {document.fileSize && (
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">File Size:</span>
                <span>{document.fileSize} MB</span>
              </div>
            )}
            
            {/* Language */}
            {document.language && (
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Language:</span>
                <span>{document.language.charAt(0).toUpperCase() + document.language.slice(1)}</span>
              </div>
            )}
            
            {/* Rating */}
            {document.rating && (
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Rating:</span>
                <span className="text-warning">
                  {Array.from({ length: 5 }, (_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star${i < document.rating ? '' : '-o'}`}
                    ></i>
                  ))}
                  <span className="text-muted ms-1">({document.rating}/5)</span>
                </span>
              </div>
            )}
            
            {/* Published Date */}
            {document.publishedDate && (
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Published:</span>
                <span>{new Date(document.publishedDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Points Card */}
      {document.keyPoints && document.keyPoints.length > 0 && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3">
              <i className="fas fa-bullseye text-primary me-2"></i>
              Key Learning Points
            </h5>
            <ul className="list-unstyled mb-0">
              {document.keyPoints.map((point, index) => (
                <li key={index} className="mb-2 d-flex align-items-start">
                  <i className="fas fa-check text-success mt-1 me-2 fa-sm"></i>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tags Card */}
      {document.tags && document.tags.length > 0 && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3">
              <i className="fas fa-tags text-primary me-2"></i>
              Topics Covered
            </h5>
            <div className="d-flex flex-wrap gap-2">
              {document.tags.map((tag, index) => (
                <span key={index} className="badge bg-light text-dark border">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related Documents */}
      {relatedDocs.length > 0 && (
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3">
              <i className="fas fa-book-open text-primary me-2"></i>
              Related Documents
            </h5>
            <div className="space-y-3">
              {relatedDocs.map((doc) => (
                <Link 
                  key={doc.id}
                  href={`/${doc.subjectArea}/${doc.slug}`}
                  className="d-block text-decoration-none"
                >
                  <div className="d-flex align-items-start p-2 rounded hover-bg">
                    <i className={`${getCategoryIcon(doc.subjectArea)} text-primary mt-1 me-3`}></i>
                    <div className="flex-grow-1">
                      <h6 className="fw-medium text-dark mb-1">{doc.title}</h6>
                      <small className="text-muted">
                        {doc.difficulty && (
                          <span className="badge bg-light text-dark me-2">
                            {doc.difficulty}
                          </span>
                        )}
                        {doc.pages && `${doc.pages} pages`}
                      </small>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Loading Skeleton Component
function DocumentLoadingSkeleton() {
  return (
    <div className="min-vh-100 bg-light pt-5">
      <div className="container mt-5">
        <div className="placeholder-glow">
          <div className="placeholder col-3 mb-4" style={{height: '20px'}}></div>
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="placeholder col-8 mb-3" style={{height: '30px'}}></div>
                  <div className="placeholder col-10 mb-2" style={{height: '20px'}}></div>
                  <div className="placeholder" style={{height: '500px'}}></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="placeholder col-6 mb-3" style={{height: '20px'}}></div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="placeholder col-12 mb-2" style={{height: '15px'}}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Document Not Found Component
function DocumentNotFound() {
  return (
    <div className="min-vh-100 bg-light pt-5">
      <div className="container mt-5">
        <div className="row justify-content-center text-center py-5">
          <div className="col-lg-6">
            <i className="fas fa-file-excel display-1 text-muted mb-4"></i>
            <h1 className="h2 fw-bold text-dark mb-3">Document Not Found</h1>
            <p className="text-muted mb-4">
              The document you're looking for doesn't exist or may have been moved.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Link href="/" className="btn btn-primary">
                <i className="fas fa-home me-2"></i>
                Go Home
              </Link>
              <Link href="/forex-trading" className="btn btn-outline-primary">
                <i className="fas fa-coins me-2"></i>
                Browse Forex
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}