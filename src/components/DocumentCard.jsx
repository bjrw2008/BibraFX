'use client';
import Link from "next/link";

export default function DocumentCard({ document }) {
  const category = document.category || document.subjectArea || "document";

  return (
    <div className="card doc-card shadow-sm border-0 h-100">
      
      {/* Thumbnail */}
      <div className="doc-thumb">
        {document.thumbnailUrl ? (
          <img
            src={document.thumbnailUrl}
            alt={document.title}
            className="thumb-img"
          />
        ) : (
          <div className="thumb-placeholder">
            <i className="fas fa-file-pdf fs-1 text-muted"></i>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column">

        {/* Category Badge */}
        <span className="badge bg-primary mb-3">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>

        <h5 className="card-title fw-bold text-dark mb-2">
          {document.title}
        </h5>

        <p className="text-muted small flex-grow-1">
          {document.description?.slice(0, 100)}...
        </p>

        {/* Bottom Section */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            {document.pages ? `${document.pages} pages` : ""}
          </small>

          <Link
            href={`/${document.subjectArea}/${document.slug}`}
            className="btn btn-outline-primary btn-sm"
          >
            View →
          </Link>
        </div>

      </div>
    </div>
  );
}
