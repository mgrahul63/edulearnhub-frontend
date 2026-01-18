import { useEffect, useState } from "react";
import { FaCertificate, FaCheckCircle, FaVideo } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { getCoursesDetailsAPI } from "../../services/api/course";
import { assets } from "../../assets/assets";

const ViewCourseDetails = () => {
  const { courseId } = useParams();
  const { state } = useLocation();
  const course = state?.course;
  const [courseInfo, setCourseInfo] = useState({});
  useEffect(() => {
    const fetchCoureseDetials = async () => {
      const res = await getCoursesDetailsAPI(courseId);
      if (res.data.success) {
        setCourseInfo(res.data.data);
      }
    };
    fetchCoureseDetials();
  }, [courseId]);
  return (
    <div className="w-full">
      {/* course header */}
      {/* heading */}
      <div className="flex flex-col justify-between p-5 border rounded-xl bg-white hover:shadow-lg transition duration-300">
        {/* Thumbnail */}
        <div className="overflow-hidden rounded-lg mb-4">
          <img
            src={course?.thumbnail || assets?.course_1_thumbnail}
            alt={course?.title}
            className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {course?.title}
          </h3>
          <p className="text-sm text-indigo-600 font-medium mb-1">
            Category: {course?.category_name || "N/A"}
          </p>
          <p className="text-sm text-gray-800 font-medium mt-2">
            Price: <span className="text-green-600">${course?.price}</span> |
            Status:{" "}
            <span
              className={`${
                course?.status === "Active" ? "text-green-600" : "text-red-500"
              } font-semibold`}
            >
              {course?.status}
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            {course?.description}
          </p>
        </div>
      </div>
      <div className="mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        {/* <div className="p-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800">
              {courseInfo.title || "Course Preview"}
            </h2>
            <p className="text-gray-500 mt-1">{courseInfo.subtitle || ""}</p>
          </div> */}

        <div className="p-6 space-y-6">
          {/* Full Description */}
          {courseInfo?.fullDescription?.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Course Content
              </h3>
              <div className="space-y-4">
                {courseInfo.fullDescription.map((desc, index) => {
                  switch (desc.type) {
                    case "paragraph":
                      return (
                        <p
                          key={index}
                          className="text-gray-700 leading-relaxed"
                        >
                          {desc.text}
                        </p>
                      );
                    case "list":
                      return (
                        <ul
                          key={index}
                          className="list-none list-inside pl-5 text-gray-700 space-y-1"
                        >
                          {desc.items?.map((item, idx) => (
                            <li key={idx}>
                              <FaCheckCircle className="inline mr-2 text-green-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    case "link":
                      return (
                        <a
                          key={index}
                          href={desc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 underline"
                        >
                          {desc.description || desc.url}
                        </a>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          )}

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FaVideo className="text-indigo-500" />
              <span className="text-gray-800 font-medium">
                {courseInfo.totalDuration || 0} mins •{" "}
                {courseInfo.totalLessons || 0} Lessons
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-800 font-medium">Level:</span>
              <span className="text-gray-600">
                {courseInfo.level || "Beginner"}
              </span>
            </div>
            <div>
              <span className="text-gray-800 font-medium">Language:</span>{" "}
              <span className="text-gray-600">
                {courseInfo.language || "N/A"}
              </span>
            </div>
            {courseInfo.certificate && (
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <FaCertificate />
                Certificate Available
              </div>
            )}
          </div>

          {/* Promo Video */}
          {courseInfo.promoVideoUrl && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Promo Video
              </h3>
              <a
                href={courseInfo.promoVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 underline flex items-center gap-2"
              >
                <FaVideo /> Watch Video
              </a>
            </div>
          )}

          {/* Arrays: Requirements, What You Will Learn, Target Audience */}
          {[
            { title: "Requirements", data: courseInfo.requirements },
            { title: "What You Will Learn", data: courseInfo.whatYouWillLearn },
            { title: "Target Audience", data: courseInfo.targetAudience },
          ].map(
            (section) =>
              section.data?.length > 0 && (
                <div key={section.title}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {section.title}
                  </h3>
                  <ul className="list-none list-inside pl-5 text-gray-700 space-y-1">
                    {section.data.map((item, idx) => (
                      <li key={idx}>
                        <FaCheckCircle className="inline mr-2 text-green-500" />
                        {item || "-"}
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCourseDetails;
