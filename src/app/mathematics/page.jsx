"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";   // ✅ Correct path
import { collection, getDocs } from "firebase/firestore";
import DocumentCard from "@/components/DocumentCard";
import SubjectGridSkeleton from "@/components/SubjectGridSkeleton";
import "./MathematicsPage.css"; // Import the CSS file

export default function MathematicsPage() {
  const [docsList, setDocsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDocs() {
      try {
        const snapshot = await getDocs(collection(db, "mathematics"));
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setDocsList(docs);
      } catch (error) {
        console.error("Error loading:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDocs();
  }, []);

  return (
    <div className="mathematics-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-title-container">
            <div className="hero-icon">
              <svg viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="hero-title">Mathematics</h1>
          </div>
          <p className="hero-description">
            Explore a comprehensive collection of mathematics documents, formulas, and resources. 
            From algebra to calculus, master the language of numbers and patterns.
          </p>
          
          {/* Stats Bar */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">{docsList.length}+</div>
              <div className="stat-label">Documents</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Updated</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">Free</div>
              <div className="stat-label">Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Results Header */}
        <div className="results-header">
          <div>
            <h2 className="section-title">Available Documents</h2>
            <p className="results-count">
              {docsList.length} documents found • Sorted by latest
            </p>
          </div>
          <div className="view-controls">
            <select className="sort-select">
              <option>Sort by: Latest</option>
              <option>Sort by: Popular</option>
              <option>Sort by: Name</option>
            </select>
          </div>
        </div>

        {/* Documents Grid */}
        {loading ? (
          <SubjectGridSkeleton />
        ) : docsList.length > 0 ? (
          <div className="documents-grid">
            {docsList.map((doc) => (
              <DocumentCard key={doc.id} document={doc} category="mathematics" />
            ))}
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
              There are currently no mathematics documents available. Be the first to upload one!
            </p>
            <button className="upload-button">
              Upload First Document
            </button>
          </div>
        )}

        {/* Featured Resources Section */}
        {!loading && docsList.length > 0 && (
          <div className="featured-section">
            <h3 className="section-title">Featured Resources</h3>
            <div className="featured-grid">
              <div className="featured-card help-card">
                <div className="featured-content">
                  <div className="featured-icon">
                    <svg viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="featured-title">Need Help?</h4>
                    <p className="featured-text">
                      Check out our mathematics tutorial section for step-by-step guides and learning paths.
                    </p>
                  </div>
                </div>
              </div>
              <div className="featured-card contribute-card">
                <div className="featured-content">
                  <div className="featured-icon">
                    <svg viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="featured-title">Contribute</h4>
                    <p className="featured-text">
                      Share your knowledge with the community by uploading your own mathematics documents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}