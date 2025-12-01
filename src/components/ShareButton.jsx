'use client';
import { useState } from 'react';

export default function ShareButton({ document, size = 'md' }) {
  const [showCopied, setShowCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? 
    `${window.location.origin}/${document.subjectArea}/${document.slug}` : '';
  
  const shareText = `Check out "${document.title}" on BibraFX - Premium Forex Trading Education`;
  const shareTitle = document.title;

  const handleShare = async (platform) => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(shareText);
    const title = encodeURIComponent(shareTitle);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${text}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      email: `mailto:?subject=${title}&body=${text} ${url}`
    };

    if (platform === 'copy') {
      await handleCopyLink();
      return;
    }

    if (shareUrls[platform]) {
      if (platform === 'email') {
        window.location.href = shareUrls[platform];
      } else {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
      }
    }

    setShowShareMenu(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopied(true);
      setShowShareMenu(false);
      
      // Hide "Copied!" message after 2 seconds
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setShowCopied(true);
      setShowShareMenu(false);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const buttonSizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  };

  const iconSizes = {
    sm: 'fa-sm',
    md: '',
    lg: 'fa-lg'
  };

  return (
    <div className="share-button position-relative">
      {/* Main Share Button */}
      <button 
        className={`btn btn-outline-primary ${buttonSizes[size]} position-relative`}
        onClick={() => setShowShareMenu(!showShareMenu)}
        onBlur={() => setTimeout(() => setShowShareMenu(false), 200)}
      >
        <i className={`fas fa-share-alt ${iconSizes[size]} ${showCopied ? 'text-success' : ''}`}></i>
        {size !== 'sm' && <span className="ms-2">Share</span>}
        
        {/* Copied Success Badge */}
        {showCopied && (
          <span className="position-absolute top-0 start-100 translate-middle badge bg-success">
            Copied!
            <span className="visually-hidden">Link copied to clipboard</span>
          </span>
        )}
      </button>

      {/* Share Dropdown Menu */}
      {showShareMenu && (
        <div className="share-menu dropdown-menu show position-absolute end-0 mt-1">
          <div className="dropdown-header small fw-bold">Share Document</div>
          
          <button 
            className="dropdown-item d-flex align-items-center"
            onClick={() => handleShare('copy')}
          >
            <i className="fas fa-link text-muted me-2"></i>
            Copy Link
            <small className="text-muted ms-2">Ctrl+C</small>
          </button>
          
          <div className="dropdown-divider"></div>
          
          <button 
            className="dropdown-item d-flex align-items-center"
            onClick={() => handleShare('twitter')}
          >
            <i className="fab fa-twitter text-info me-2"></i>
            Twitter
          </button>
          
          <button 
            className="dropdown-item d-flex align-items-center"
            onClick={() => handleShare('facebook')}
          >
            <i className="fab fa-facebook text-primary me-2"></i>
            Facebook
          </button>
          
          <button 
            className="dropdown-item d-flex align-items-center"
            onClick={() => handleShare('linkedin')}
          >
            <i className="fab fa-linkedin text-primary me-2"></i>
            LinkedIn
          </button>
          
          <div className="dropdown-divider"></div>
          
          <button 
            className="dropdown-item d-flex align-items-center"
            onClick={() => handleShare('whatsapp')}
          >
            <i className="fab fa-whatsapp text-success me-2"></i>
            WhatsApp
          </button>
          
          <button 
            className="dropdown-item d-flex align-items-center"
            onClick={() => handleShare('telegram')}
          >
            <i className="fab fa-telegram text-info me-2"></i>
            Telegram
          </button>
          
          <div className="dropdown-divider"></div>
          
          <button 
            className="dropdown-item d-flex align-items-center"
            onClick={() => handleShare('email')}
          >
            <i className="fas fa-envelope text-muted me-2"></i>
            Email
          </button>
        </div>
      )}

      <style jsx>{`
        .share-button {
          display: inline-block;
        }
        
        .share-menu {
          min-width: 200px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          border: 1px solid rgba(0,0,0,0.1);
          z-index: 1000;
        }
        
        .share-menu .dropdown-item {
          padding: 0.5rem 1rem;
          transition: all 0.2s ease;
        }
        
        .share-menu .dropdown-item:hover {
          background: #f8f9fa;
        }
        
        .share-menu .dropdown-header {
          padding: 0.5rem 1rem;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }
      `}</style>
    </div>
  );
}