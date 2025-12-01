'use client';
import { useState, useEffect } from 'react';

export default function PDFViewer({ pdfURL }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enhanced iframe URL to disable downloads and printing
  const getEnhancedPDFUrl = (url) => {
    if (!url) return '';
    
    // Add parameters to disable download and print
    const disableParams = '#toolbar=0&navpanes=0&scrollbar=0&view=FitH';
    
    // For Google Drive
    if (url.includes('drive.google.com')) {
      if (url.includes('/preview')) {
        return url + disableParams;
      }
      // Convert Google Drive link to preview if it's a direct link
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) {
        return `https://drive.google.com/file/d/${match[1]}/preview${disableParams}`;
      }
    }
    
    // For direct PDF links
    if (url.endsWith('.pdf')) {
      return url + disableParams;
    }
    
    // Fallback: Use Google Docs viewer
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true${disableParams}`;
  };

  const enhancedPDFUrl = getEnhancedPDFUrl(pdfURL);

  // Prevent right-click and context menu
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      // Disable print screen, save shortcuts
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleError = () => {
    setIsLoading(false);
    setError('Failed to load PDF document');
  };

  return (
    <div className="pdf-viewer-container position-relative w-100 h-100">
      {/* Loading State */}
      {isLoading && (
        <div className="pdf-loading d-flex flex-column align-items-center justify-content-center w-100 h-100 bg-light rounded">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading document...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="pdf-error d-flex flex-column align-items-center justify-content-center w-100 h-100 bg-light rounded">
          <i className="fas fa-exclamation-triangle text-danger display-4 mb-3"></i>
          <h5 className="text-danger mb-2">Failed to Load Document</h5>
          <p className="text-muted text-center mb-3">{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setIsLoading(true);
              setError(null);
            }}
          >
            <i className="fas fa-redo me-2"></i>
            Try Again
          </button>
        </div>
      )}

      {/* PDF Viewer */}
      <div className={`pdf-frame-container ${isLoading || error ? 'd-none' : 'd-block'} w-100 h-100`}>
        <iframe
          src={enhancedPDFUrl}
          className="pdf-iframe w-100 h-100 border-0"
          onLoad={handleLoad}
          onError={handleError}
          title="PDF Document"
          allow="fullscreen"
          style={{ minHeight: '600px' }}
        />
        
        {/* Additional protection overlay */}
        <div 
          className="protection-overlay position-absolute top-0 start-0 w-100 h-100"
          style={{ 
            pointerEvents: 'none',
            background: 'transparent',
            zIndex: 1 
          }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      {/* Security Notice */}
      <div className="security-notice mt-3 p-3 bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded">
        <div className="d-flex align-items-center">
          <i className="fas fa-shield-alt text-warning me-2"></i>
          <small className="text-muted">
            <strong>Protected View:</strong> Downloading and printing have been disabled for this document.
          </small>
        </div>
      </div>

      <style jsx>{`
        .pdf-viewer-container {
          min-height: 600px;
        }
        
        .pdf-iframe {
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .pdf-loading, .pdf-error {
          min-height: 400px;
        }
        
        .protection-overlay {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        
        @media (max-width: 768px) {
          .pdf-viewer-container {
            min-height: 400px;
          }
        }
      `}</style>
    </div>
  );
}