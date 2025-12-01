import { getDocBySlug } from "@/lib/firestore";
import PDFViewer from "@/components/PDFViewer";

export default async function BookPage({ params }) {
  const book = await getDocBySlug("books", params.slug);

  if (!book) return <h1 className="container py-5">Book not found</h1>;

  return (
    <div className="container py-5">
      <h1 className="fw-bold">{book.title}</h1>

      <p className="text-muted mt-2">{book.description}</p>

      {book.pdfUrl ? (
        <PDFViewer pdfURL={book.pdfUrl} />
      ) : (
        <p className="text-danger mt-4">No PDF available for this book.</p>
      )}
    </div>
  );
}
