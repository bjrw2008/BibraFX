import { getDocBySlug } from "@/lib/firestore";
import PDFViewer from "@/components/PDFViewer";

export default async function CoursePage({ params }) {
  const course = await getDocBySlug("courses", params.slug);

  if (!course) return <h1 className="container py-5">Course not found</h1>;

  return (
    <div className="container py-5">
      <h1 className="fw-bold">{course.title}</h1>

      <p className="text-muted mt-2">{course.description}</p>

      {course.pdfUrl ? (
        <PDFViewer pdfURL={course.pdfUrl} />
      ) : (
        <p className="text-danger mt-4">No PDF available for this course.</p>
      )}
    </div>
  );
}
