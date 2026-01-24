import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useApp } from "../../hooks/useApp";
import { getBookAPI } from "../../services/api/chapter";
import ChapterTableList from "./ChapterTableList";

const CourseDashboard = () => {
  const { state } = useLocation();
  const course = state?.course;
  const { courseId } = useParams();
  const { userinfo } = useApp();

  const [selectBook, setSelectBook] = useState(null);
  const [isOpenChapter, setIsOpenChapter] = useState(false);

  const { data } = useQuery({
    queryKey: ["books", courseId],
    queryFn: () => getBookAPI(courseId),
    enabled: !!courseId,
  });

  const handleOpenBook = (book) => {
    setSelectBook(book);
    setIsOpenChapter(true);
  };
  return (
    <div className="mx-auto">
      <h2 className="text-2xl text-center font-semibold bg-gray-100 py-4 mb-1">
        {course.title}
      </h2>
      {!isOpenChapter && (
        <h6 className="text-lg bg-green-400 text-center font-semibold py-2 rounded-t-md mb-2">
          List of Books
        </h6>
      )}
      <div className="md:flex md:flex-row w-full gap-4">
        {/* LEFT: BOOK LIST */}
        <div
          className={`${
            !isOpenChapter
              ? "w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2"
              : "sm:w-full md:w-2/12 md:flex flex-col border border-gray-100 rounded"
          }`}
        >
          {isOpenChapter && (
            <h6 className="text-lg bg-green-400 text-center font-semibold py-2 rounded-t-md">
              List of Books
            </h6>
          )}

          {data?.success &&
            data?.books.length > 0 &&
            data?.books.map((book) => (
              <div
                key={book.id}
                className="border border-gray-100 rounded overflow-hidden cursor-pointer hover:bg-gray-100 hover:shadow-lg transition w-full mb-2 p-2"
              >
                <div className="relative" onClick={() => handleOpenBook(book)}>
                  <img
                    src={book?.bookImage}
                    alt={book?.bookName}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-opacity-40">
                    <p className="text-blue-500 text-xl font-medium text-center px-2">
                      {book?.bookName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {isOpenChapter && (
          <div className="w-10/12 border border-gray-100 rounded p-4">
            {selectBook ? (
              <p className="text-lg font-semibold text-gray-700 mb-4">
                Chapters for:{" "}
                <span className="text-blue-600">{selectBook.bookName}</span>
              </p>
            ) : (
              <p className="text-lg font-semibold text-gray-500 mb-4">
                Please select a book to view chapters
              </p>
            )}
            <ChapterTableList bookId={selectBook?.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDashboard;
