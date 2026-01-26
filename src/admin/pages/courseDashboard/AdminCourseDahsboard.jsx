import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ActionButton from "../../../components/ActionButton";
import { delteBookAPI, getBookAPI } from "../../../services/api/chapter";
import BookForm from "../../components/BookForm";

const AdminCourseDashboard = () => {
  const { courseId } = useParams();
  const { state } = useLocation();
  const course = state?.course;

  const [selectBook, setSelectBook] = useState({});
  const [isOpenBookForm, setOpenBookForm] = useState(false);

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["books", courseId],
    queryFn: () => getBookAPI(courseId),
    enabled: !!courseId,
  });

  const handleOpenBook = () => {
    setOpenBookForm(true);
    setSelectBook(null);
  };

  const handleEditBook = (book) => {
    setSelectBook({ ...book, method: "edit" });
    setOpenBookForm(true);
  };

  const handleDeleteBook = async (book) => {
    try {
      const res = await delteBookAPI(book.id);
      if (res.success) {
        toast.success(res.message || "Book deleted successfully");
        queryClient.invalidateQueries(["books", courseId]);
      } else {
        toast.error(res.message || "Failed to delete book");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while deleting book");
    }
  };

  return (
    <div className="p-3 mx-auto">
      <h2 className="text-2xl text-center font-semibold bg-gray-100 py-4 mb-1">
        {course.title}
      </h2>

      <div className="flex gap-2 items-center">
        <p className="text-xl text-gray-600 mb-2">Want to add a book?</p>
        <ActionButton
          text={"Click here"}
          OnClick={handleOpenBook}
          className={"bg-green-500"}
        />
      </div>

      {!isOpenBookForm && (
        <h6 className="text-lg bg-green-400 text-center font-semibold py-2 rounded-t-md">
          List of Books
        </h6>
      )}
      <div className="md:flex md:flex-row w-full gap-4">
        {/* LEFT: BOOK LIST */}
        <div
          className={`${
            !isOpenBookForm
              ? "w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2"
              : "sm:w-full md:w-2/12 md:flex flex-col border border-gray-100 rounded"
          }`}
        >
          {isOpenBookForm && (
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
                <Link to={`${book.id}`} state={{ book }} className="relative">
                  <img
                    src={book.bookImage}
                    alt={book.bookName}
                    className="w-full h-32 object-cover hover:text-gray-800"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-opacity-40">
                    <p className="text-blue-500 text-xl font-medium text-center px-2">
                      {book.bookName}
                    </p>
                  </div>
                </Link>

                <div className="flex justify-between items-center mt-2 px-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditBook(book);
                    }}
                    className="text-sm cursor-pointer bg-blue-600 hover:bg-gray-500 px-3 py-1 rounded text-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBook(book);
                    }}
                    className="text-sm cursor-pointer bg-red-600 hover:bg-gray-500 px-2 py-1 rounded text-gray-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* RIGHT: CHAPTER AREA */}
        {isOpenBookForm && (
          <div className="w-10/12 border border-gray-100 rounded p-4">
            <BookForm
              setOpenBookForm={setOpenBookForm}
              selectBook={selectBook}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourseDashboard;
