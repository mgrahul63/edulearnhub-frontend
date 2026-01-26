import { useLocation } from "react-router-dom";
import ChapterTableList from "./ChapterTableList";

const BookPage = () => {
  const { state } = useLocation();
  const selectedBook = state?.book; // or whatever key you passed

  if (!selectedBook) {
    return <p>No book selected</p>;
  }
  return (
    <div
      id="myTargetDiv"
      className="sm:w-full md:w-full border border-gray-100 rounded p-4"
    >
      {selectedBook ? (
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Chapters for:{" "}
          <span className="text-blue-600">{selectedBook?.bookName}</span>
        </p>
      ) : (
        <p className="text-lg font-semibold text-gray-500 mb-4">
          Please select a book to view chapters
        </p>
      )}
      <ChapterTableList bookId={selectedBook?.id} />
    </div>
  );
};

export default BookPage;
