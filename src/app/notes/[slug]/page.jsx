'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PDFViewer from '@/components/PDFViewer';
import { getDocBySlug } from '@/lib/firestore';

export default function NoteDetailPage() {
  const params = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNote() {
      try {
        const noteData = await getDocBySlug('notes', params.slug);
        setNote(noteData);
      } catch (error) {
        console.error('Error loading note:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) {
      loadNote();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-vh-100 bg-light py-5">
        <div className="container">
          <div className="placeholder-glow">
            <div className="placeholder col-2 mb-4" style={{height: '20px'}}></div>
            <div className="placeholder col-4 mb-5" style={{height: '30px'}}></div>
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="placeholder col-6 mb-3" style={{height: '24px'}}></div>
                    <div className="placeholder col-10 mb-2" style={{height: '20px'}}></div>
                    <div className="placeholder col-12 mb-1" style={{height: '16px'}}></div>
                    <div className="placeholder col-11" style={{height: '16px'}}></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <div className="placeholder" style={{height: '400px'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-vh-100 bg-light py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <div className="icon-large mb-3">😕</div>
              <h1 className="display-6 fw-bold text-dark mb-3">Note Not Found</h1>
              <p className="text-muted mb-4">The note you're looking for doesn't exist.</p>
              <Link 
                href="/notes" 
                className="btn btn-custom-primary"
              >
                ← Back to Notes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <Link 
            href="/notes" 
            className="btn btn-link text-primary text-decoration-none p-0 d-flex align-items-center"
          >
            <span className="me-1">←</span>
            Back to Notes
          </Link>
        </nav>

        <div className="row g-4">
          {/* Left Panel - Metadata */}
          <div className="col-lg-4">
            <div className="card custom-card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <span className="icon-medium me-2">📝</span>
                  <span className="badge badge-notes p-2">
                    Note
                  </span>
                </div>
                
                <h1 className="h2 fw-bold text-dark mb-4">
                  {note.title}
                </h1>
                
                <p className="text-muted mb-4 lead">
                  {note.description}
                </p>

                <div className="mb-4">
                  <div className="d-flex align-items-center text-muted mb-2">
                    <span className="me-2">📁</span>
                    Category: <span className="ms-1 fw-medium text-dark">{note.category}</span>
                  </div>
                  
                  <div className="d-flex align-items-center text-muted">
                    <span className="me-2">📅</span>
                    Last updated: <span className="ms-1 fw-medium text-dark">Recently</span>
                  </div>
                </div>

                <div className="pt-4 border-top">
                  <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center">
                    <span className="me-2">🔗</span>
                    Share Document
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - PDF Viewer */}
          <div className="col-lg-8">
            <div className="card custom-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h5 fw-semibold text-dark mb-0">Document Viewer</h2>
                  <div className="text-muted small">
                    Read-only • Downloads disabled
                  </div>
                </div>
                
                <PDFViewer pdfURL={note.pdfUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}