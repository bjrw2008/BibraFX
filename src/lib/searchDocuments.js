// src/lib/searchDocuments.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Search documents across multiple Firestore collections.
 * - Performs parallel reads of each collection (getDocs)
 * - Filters client-side by title / description / tags / author
 * - Returns a capped list of results
 *
 * @param {string} q search query
 * @param {string[]} collections optional override list of collections
 * @returns {Promise<Array<{ id, title, slug, collection, ... }>>}
 */
export async function searchDocuments(q, collections = null) {
  if (!q || typeof q !== "string" || q.trim().length === 0) return [];

  const query = q.trim().toLowerCase();

  // Default collections (edit this to match your DB)
  const COLLECTIONS_TO_SEARCH = collections || [
    "books",
    "computer-science",
    "courses",
    "forex-trading",
    "forex-basics",
    "handouts",
    "mathematics",
    "notes",
    "technical-analysis",
    "economics",
    "business"
  ];

  // Read all collections in parallel
  const promises = COLLECTIONS_TO_SEARCH.map((col) =>
    getDocs(collection(db, col)).then((snap) =>
      snap.docs.map((d) => ({ id: d.id, collection: col, ...d.data() }))
    ).catch((err) => {
      console.error("Error reading collection", col, err);
      return []; // treat failure as empty collection (don't throw)
    })
  );

  const resultsByCollection = await Promise.all(promises);

  // Flatten and filter client-side
  const flat = resultsByCollection.flat();

  const filtered = flat.filter((item) => {
    // Normalize fields, guard missing values
    const title = (item.title || "").toString().toLowerCase();
    const desc = (item.description || "").toString().toLowerCase();
    const author = (item.author || "").toString().toLowerCase();
    const tags = (item.tags || []).map((t) => t.toString().toLowerCase());

    // match anywhere in title/description/author or tags
    if (title.includes(query)) return true;
    if (desc.includes(query)) return true;
    if (author.includes(query)) return true;
    if (tags.some((t) => t.includes(query))) return true;

    return false;
  });

  // Deduplicate by collection+id (just in case)
  const dedup = [];
  const seen = new Set();
  for (const item of filtered) {
    const key = `${item.collection}:${item.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      dedup.push(item);
    }
  }

  // Limit to first 30 results and map to lightweight shape
  return dedup.slice(0, 30).map((r) => ({
    id: r.id,
    title: r.title || "Untitled",
    slug: r.slug || r.id,
    collection: r.collection,
    thumbnailUrl: r.thumbnailUrl || null,
    description: r.description || "",
    author: r.author || ""
  }));
}
