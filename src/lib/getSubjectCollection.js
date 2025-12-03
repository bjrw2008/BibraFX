import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getSubjectCollection(subject) {
  const colRef = collection(db, subject); // ← loads from actual collection name
  const snapshot = await getDocs(colRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
