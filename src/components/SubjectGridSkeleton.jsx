export default function SubjectGridSkeleton() {
  const items = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {items.map((_, i) => (
        <div
          key={i}
          className="bg-white shadow rounded-xl p-4 animate-pulse border border-gray-200"
        >
          {/* Thumbnail */}
          <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>

          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

          {/* Description lines */}
          <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6 mb-3"></div>

          {/* Footer */}
          <div className="flex justify-between mt-3">
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
