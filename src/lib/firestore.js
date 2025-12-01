import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';

// Helper function to safely get document data
const getDocData = (doc) => {
  try {
    const data = doc.data();
    return {
      id: doc.id,
      title: data?.title || 'Untitled Document',
      description: data?.description || 'No description available',
      slug: data?.slug || doc.id,
      subjectArea: data?.subjectArea || data?.category || 'unknown',
      pdfUrl: data?.pdfUrl || data?.pdfURL || '',
      thumbnailUrl: data?.thumbnailUrl || data?.thumbnailURL || null,
      author: data?.author || 'Unknown Author',
      pages: data?.pages || null,
      fileSize: data?.fileSize || null,
      difficulty: data?.difficulty || 'beginner',
      language: data?.language || 'english',
      rating: data?.rating || 3,
      tags: data?.tags || [],
      keyPoints: data?.keyPoints || [],
      prerequisites: data?.prerequisites || '',
      docType: data?.docType || data?.type || 'ebook',
      publishedDate: data?.publishedDate || null,
      timeframe: data?.timeframe || null,
      currencyPairs: data?.currencyPairs || null,
      createdAt: data?.createdAt || null,
      updatedAt: data?.updatedAt || null,
      previewUrl: data?.previewUrl || data?.pdfUrl || ''
    };
  } catch (error) {
    console.error('Error parsing document data:', error);
    return null;
  }
};

export async function getDocBySlug(category, slug) {
  try {
    console.log(`Fetching document: ${category}/${slug}`);
    
    const q = query(
      collection(db, category),
      where('slug', '==', slug)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docData = getDocData(querySnapshot.docs[0]);
      console.log('Found document:', docData);
      return docData;
    }
    
    console.log('No document found with slug:', slug);
    return null;
  } catch (error) {
    console.error('Error fetching document by slug:', error);
    return null;
  }
}

export async function getAllDocuments(category) {
  try {
    console.log(`Fetching all documents from: ${category}`);
    
    const querySnapshot = await getDocs(collection(db, category));
    const documents = [];
    
    querySnapshot.forEach((doc) => {
      const docData = getDocData(doc);
      if (docData) {
        documents.push(docData);
      }
    });
    
    console.log(`Found ${documents.length} documents in ${category}`);
    return documents;
  } catch (error) {
    console.error(`Error fetching documents from ${category}:`, error);
    return [];
  }
}

export async function getRelatedDocuments(category, tags = [], limit = 5) {
  try {
    if (!tags || tags.length === 0) {
      const allDocs = await getAllDocuments(category);
      return allDocs
        .filter(doc => doc.title && doc.pdfUrl)
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);
    }

    const allDocs = await getAllDocuments(category);
    const validDocs = allDocs.filter(doc => doc.title && doc.pdfUrl);
    
    const scoredDocs = validDocs.map(doc => {
      let score = 0;
      if (doc.tags && Array.isArray(doc.tags)) {
        doc.tags.forEach(tag => {
          if (tags.includes(tag)) {
            score += 2;
          }
        });
      }
      return { ...doc, score };
    });

    const related = scoredDocs
      .filter(doc => doc.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // If not enough related docs, add random ones
    if (related.length < limit) {
      const remaining = validDocs
        .filter(doc => !related.some(rel => rel.id === doc.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, limit - related.length);
      return [...related, ...remaining];
    }

    return related;
  } catch (error) {
    console.error('Error getting related documents:', error);
    return [];
  }
}

// Get documents by multiple categories
export async function getDocumentsByCategories(categories) {
  try {
    const allPromises = categories.map(category => getAllDocuments(category));
    const results = await Promise.all(allPromises);
    
    let allDocs = [];
    results.forEach((docs, index) => {
      const categoryDocs = docs.map(doc => ({
        ...doc,
        subjectArea: categories[index]
      }));
      allDocs = [...allDocs, ...categoryDocs];
    });

    return allDocs.filter(doc => doc.title && doc.pdfUrl);
  } catch (error) {
    console.error('Error fetching documents by categories:', error);
    return [];
  }
}