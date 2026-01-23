import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useApp } from "../hooks/useApp";
import { useEnrollmentStatus } from "../hooks/useEnrollmentStatus";

const HeadingForCourseDetails = ({ course, isbutton }) => {
  const { userinfo } = useApp();

  const courseId = course?.id;
  const userId = userinfo?.id;

  const { data } = useEnrollmentStatus(courseId, userId);
  const isEnrolled = data?.success ? data.data : false;

  const buttonText = isEnrolled ? "Go to Course" : "Enroll Now";
  const buttonPath = isEnrolled
    ? `/course/${courseId}`
    : `/payments/${courseId}`;

  return (
    <div className="flex flex-col justify-between p-3 border rounded-xl bg-white hover:shadow-lg transition duration-300">
      {/* Thumbnail */}
      <div className="overflow-hidden rounded-lg mb-4">
        <img
          src={course?.thumbnail || assets.course_1_thumbnail}
          alt={course?.title}
          className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {course?.title}
        </h3>

        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
          {course?.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-indigo-600 font-medium">
              Category: {course?.category_name || "N/A"}
            </p>
            <p className="text-gray-800 font-medium">
              Price: <span className="text-gray-950">${course?.price}</span>
            </p>
          </div>

          {isbutton && (
            <Link
              to={buttonPath}
              state={{ course }}
              className={`px-4 py-2 ${isEnrolled ? "bg-green-500" : "bg-indigo-600"} text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition`}
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeadingForCourseDetails;
