'use client';
import { useEffect, useState } from 'react';
import { getAllDocuments } from '@/lib/firestore';
import Link from 'next/link';
import DocumentCard from '@/components/DocumentCard';
import './AllSubjectsPage.css';

// The subjects you want to load
const SUBJECTS = [
  { 
    id: 'mathematics', 
    label: 'Mathematics', 
    icon: 'fas fa-calculator',
    color: 'purple',
    description: 'Explore algebra, calculus, geometry and advanced mathematical concepts'
  },
  { 
    id: 'economics', 
    label: 'Economics', 
    icon: 'fas fa-chart-pie',
    color: 'amber',
    description: 'Study microeconomics, macroeconomics, and economic theories'
  },
  { 
    id: 'business', 
    label: 'Business', 
    icon: 'fas fa-briefcase',
    color: 'green',
    description: 'Learn about management, entrepreneurship, and business strategies'
  },
  { 
    id: 'computer-science', 
    label: 'Computer Science', 
    icon: 'fas fa-laptop-code',
    color: 'blue',
    description: 'Master programming, algorithms, AI, and software development'
  }
];

// Color mapping for each subject
const colorSchemes = {
  purple: {
    bg: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
    light: '#f5f3ff',
    dark: '#6d28d9'
  },
  amber: {
    bg: 'linear-gradient(135deg, #d97706, #f59e0b)',
    light: '#fffbeb',
    dark: '#b45309'
  },
  green: {
    bg: 'linear-gradient(135deg, #059669, #10b981)',
    light: '#f0fdf4',
    dark: '#047857'
  },
  blue: {
    bg: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    light: '#eff6ff',
    dark: '#4338ca'
  }
};

export default function AllSubjectsPage() {
  const [subjectDocs, setSubjectDocs] = useState({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalSubjects: SUBJECTS.length
  });

  useEffect(() => {
    async function loadAllSubjects() {
      try {
        const results = {};
        let totalDocs = 0;

        // Load all subjects in parallel
        await Promise.all(
          SUBJECTS.map(async (subject) => {
            const docs = await getAllDocuments(subject.id);
            totalDocs += docs.length;

            // Attach subjectArea (important!)
            results[subject.id] = docs.map((doc) => ({
              ...doc,
              subjectArea: subject.id
            }));
          })
        );

        setSubjectDocs(results);
        setStats(prev => ({ ...prev, totalDocuments: totalDocs }));
      } catch (err) {
        console.error('Error loading documents:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAllSubjects();
  }, []);

  return (
    <div className="all-subjects-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            All <span className="hero-title-highlight">Subjects</span>
          </h1>
          <p className="hero-description">
            Browse and explore documents across all academic categories in one place. 
            Discover resources from mathematics to computer science.
          </p>
          
          {/* Stats Bar */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">{stats.totalDocuments}+</div>
              <div className="stat-label">Total Documents</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.totalSubjects}</div>
              <div className="stat-label">Subjects</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Access</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">Free</div>
              <div className="stat-label">Resources</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Subject Grid */}
        <div className="subjects-grid">
          {SUBJECTS.map((subject) => {
            const colorScheme = colorSchemes[subject.color];
            const subjectDocCount = subjectDocs[subject.id]?.length || 0;
            
            return (
              <div 
                key={subject.id} 
                className="subject-card"
                style={{ '--subject-color': colorScheme.dark }}
              >
                <div 
                  className="subject-card-header"
                  style={{ background: colorScheme.bg }}
                >
                  <div className="subject-icon">
                    <i className={`${subject.icon}`}></i>
                  </div>
                  <h3 className="subject-title">{subject.label}</h3>
                </div>
                
                <div className="subject-card-body">
                  <p className="subject-description">{subject.description}</p>
                  
                  <div className="subject-stats">
                    <div className="subject-stat">
                      <div className="subject-stat-number">{subjectDocCount}</div>
                      <div className="subject-stat-label">Documents</div>
                    </div>
                    <div className="subject-stat">
                      <div className="subject-stat-number">Free</div>
                      <div className="subject-stat-label">Access</div>
                    </div>
                  </div>
                </div>
                
                <div className="subject-card-footer">
                  <Link 
                    href={`/subjects/${subject.id}`}
                    className="subject-link-btn"
                  >
                    Explore Subject
                    <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Documents Section */}
        <div className="featured-section">
          <div className="section-header">
            <h2 className="section-title">Featured Documents</h2>
            <p className="section-subtitle">Popular documents across all subjects</p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading documents...</p>
            </div>
          ) : (
            <>
              {Object.keys(subjectDocs).length > 0 ? (
                <div className="documents-container">
                  {/* Show featured documents from all subjects */}
                  {SUBJECTS.map((subject) => {
                    const docs = subjectDocs[subject.id];
                    if (!docs || docs.length === 0) return null;
                    
                    return (
                      <div key={subject.id} className="subject-docs-section">
                        <div className="subject-docs-header">
                          <h3 className="subject-docs-title">
                            <span 
                              className="subject-color-dot"
                              style={{ 
                                backgroundColor: colorSchemes[subject.color].dark 
                              }}
                            ></span>
                            {subject.label}
                          </h3>
                          <Link 
                            href={`/subjects/${subject.id}`}
                            className="view-all-link"
                          >
                            View All
                            <i className="fas fa-arrow-right ms-2"></i>
                          </Link>
                        </div>
                        
                        <div className="subject-docs-grid">
                          {docs.slice(0, 3).map((doc) => (
                            <DocumentCard 
                              key={doc.id} 
                              document={doc}
                              compact={true}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="empty-title">No Documents Found</h3>
                  <p className="empty-description">
                    There are currently no documents available across any subjects.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Start Exploring Now</h2>
            <p className="cta-description">
              Dive deep into any subject area and discover thousands of free educational resources.
              Perfect for students, teachers, and lifelong learners.
            </p>
            <div className="cta-buttons">
              <Link href="/subjects/mathematics" className="cta-btn primary">
                <i className="fas fa-calculator me-2"></i>
                Start with Mathematics
              </Link>
              <Link href="/subjects/computer-science" className="cta-btn secondary">
                <i className="fas fa-laptop-code me-2"></i>
                Try Computer Science
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}