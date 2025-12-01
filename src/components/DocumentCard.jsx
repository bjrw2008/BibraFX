'use client';
import Link from 'next/link';

export default function DocumentCard({ document, category }) {
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'notes': return '📝';
      case 'books': return '📚';
      case 'courses': return '🎓';
      default: return '📄';
    }
  };

  const getCategoryBadgeClass = (cat) => {
    switch (cat) {
      case 'notes': return 'badge-notes';
      case 'books': return 'badge-books';
      case 'courses': return 'badge-courses';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="col">
      <div className="card custom-card card-hover h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <span className={`badge ${getCategoryBadgeClass(category)} p-2`}>
              <span className="me-1">{getCategoryIcon(category)}</span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>
          
          <h5 className="card-title fw-semibold mb-3 text-dark">
            {document.title}
          </h5>
          
          <p className="card-text text-muted mb-4">
            {document.description}
          </p>
          
          <Link 
            href={`/${category}/${document.slug}`}
            className="btn btn-link text-primary text-decoration-none p-0 fw-medium d-flex align-items-center"
          >
            View Document
            <span className="ms-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}