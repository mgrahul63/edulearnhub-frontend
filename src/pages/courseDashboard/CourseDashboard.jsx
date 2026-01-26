import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { useApp } from "../../hooks/useApp";
import { getBookAPI } from "../../services/api/chapter";
import { scrollToTop } from "../../utils/scrollToTop";

const CourseDashboard = () => {
  const { state } = useLocation();
  const course = state?.course;
  const { courseId } = useParams();
  const { userinfo } = useApp();

  const { data } = useQuery({
    queryKey: ["books", courseId],
    queryFn: () => getBookAPI(courseId),
    enabled: !!courseId,
  });

  scrollToTop();
  return (
    <div className="mx-auto">
      <h2 className="text-2xl text-center font-semibold bg-gray-100 py-4 mb-1">
        {course.title}
      </h2>

      <h6 className="text-lg bg-green-400 text-center font-semibold py-2 rounded-t-md mb-2">
        List of Books
      </h6>

      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
        {data?.success &&
          data?.books?.length > 0 &&
          data.books.map((book) => (
            <Link
              to={`${book.id}`}
              state={{ book }}
              key={book.id}
              className="border border-gray-100 rounded overflow-hidden hover:bg-gray-100 hover:shadow-lg transition"
            >
              {/* Image section */}
              <div className="relative">
                <img
                  src={book?.bookImage}
                  alt={book?.bookName}
                  className="w-full h-32 object-cover"
                />

                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold text-center px-2">
                    {book?.bookName}
                  </p>
                </div>
              </div>

              {/* Content section (separate child div) */}
              <div className="p-3">
                <p className="text-sm text-gray-600">
                  {book?.author || "Unknown Author"}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Chapters: {book?.totalChapters || 0}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CourseDashboard;
