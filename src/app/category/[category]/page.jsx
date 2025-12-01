import DocumentCard from "@/components/DocumentCard";

export default function CategoryPage({ params }) {
  const { category } = params;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {category} Notes
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DocumentCard title="Sample Note 1" slug="sample1" />
        <DocumentCard title="Sample Note 2" slug="sample2" />
      </div>
    </div>
  );
}
