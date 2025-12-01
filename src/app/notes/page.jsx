'use client';
import { useState, useEffect } from 'react';
import DocumentCard from '@/components/DocumentCard';
import { getAllDocuments } from '@/lib/firestore';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notesData = await getAllDocuments('notes');
        setNotes(notesData);
      } catch (error) {
        console.error('Error loading notes:', error);
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="placeholder-glow">
                <div className="placeholder col-3 mb-4" style={{height: '30px'}}></div>
                <div className="row g-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="col-md-6 col-lg-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="placeholder col-5 mb-3" style={{height: '24px'}}></div>
                          <div className="placeholder col-8 mb-2" style={{height: '20px'}}></div>
                          <div className="placeholder col-10" style={{height: '16px'}}></div>
                          <div className="placeholder col-7 mt-2" style={{height: '16px'}}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12">
            <h1 className="display-5 fw-bold text-dark mb-2">Study Notes</h1>
            <p className="text-muted lead">
              Comprehensive collection of study materials and lecture notes ({notes.length} documents)
            </p>
          </div>
        </div>

        {notes.length === 0 ? (
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="icon-large mb-3">📝</div>
              <h3 className="fw-semibold text-dark mb-2">No notes available</h3>
              <p className="text-muted">Check back later for new study materials.</p>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {notes.map((note) => (
              <DocumentCard 
                key={note.id} 
                document={note} 
                category="notes" 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}