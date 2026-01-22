import { useQueryClient } from "@tanstack/react-query";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { useApp } from "../hooks/useApp";
import { deleteCourseAPI } from "../services/api/course";
import truncateWords from "../utils/truncateWords";

const CourseCard = forwardRef(({ course, onEdit, purchased }, ref) => {
  const { userinfo } = useApp();

  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      if (course?.id && userinfo?.id) {
        if (window.confirm("Are you sure you want to delete this course?")) {
          const res = await deleteCourseAPI(course.id, userinfo.id);
          if (res?.success) {
            toast.success(res.message || "Course deleted successfully");
            queryClient.invalidateQueries(["courses-list", userinfo]);
          } else {
            toast.error(res.message || "Failed to delete course");
          }
        }
      }
    } catch (error) {
      console.error("Delete course failed:", error);
      toast.error("An error occurred while deleting the course");
    }
  };
  return (
    <div
      ref={ref}
      className="flex flex-col justify-between p-2 border rounded-xl bg-white hover:shadow-lg transition duration-300"
    >
      <Link to={`${course?.id}`} state={{ course }}>
        {/* Thumbnail */}
        <div className="overflow-hidden rounded-lg mb-2">
          <img
            src={course.thumbnail || assets.course_1_thumbnail}
            alt={course.title}
            className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {course.title}
          </h3>
          <p className="text-sm text-indigo-600 font-medium mb-1">
            Category: {course?.category_name || "N/A"}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            Instructor: {course?.instructorName || "N/A"}
          </p>
          <p className="text-sm text-gray-800 font-medium mt-2">
            Price: <span className="text-gray-950">${course?.price}</span> |
            Status:{" "}
            <span
              className={`${
                course?.status === "published"
                  ? "text-green-600"
                  : "text-red-500"
              } font-semibold`}
            >
              {course?.status}
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            {truncateWords(course?.description, 7)}
          </p>
        </div>
      </Link>
      {/* Access & Edit Button */}
      {purchased ? (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onEdit()}
            className="px-4 py-2 text-sm font-medium rounded-md border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
          >
            Access Course
          </button>
        </div>
      ) : (
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => onEdit()}
            className="px-4 py-2 text-sm font-medium rounded-md border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium rounded-md border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
});

export default CourseCard;
