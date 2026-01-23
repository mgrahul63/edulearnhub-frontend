import { useQuery } from "@tanstack/react-query";
import { FaCertificate, FaCheckCircle, FaVideo } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { getCoursesDetailsAPI } from "../../services/api/course";
import HeadingForCourseDetails from "../HeadingForCourseDetails";
import ScrollToTop from "../ScrollToTop";

const ViewCourseDetails = () => {
  const { courseId } = useParams();
  const { state } = useLocation();
  const course = state?.course;

  const { data, isLoading, error } = useQuery({
    queryKey: [`{course-details-${courseId}}`, courseId],
    queryFn: () => getCoursesDetailsAPI(courseId),
    enabled: !!courseId,
  });

  const courseInfo = data?.success ? data.data : null;
  const whoHeading = courseInfo?.fullDescription[0]?.heading;
  return (
    <div className="w-full mt-2 sm:mt-5">
      <ScrollToTop />
      {/* heading */}
      <HeadingForCourseDetails
        course={course} 
        isbutton={true}
      />
      <div className=" my-2 mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {isLoading && (
          <p className="text-center py-6">Loading course details...</p>
        )}

        {!isLoading && error && (
          <p className="text-center py-6 text-red-500">
            Failed to load course details. Please try again later.
          </p>
        )}

        {!isLoading && !error && !courseInfo && (
          <p className="text-center py-6 text-gray-500">
            Course details not available
          </p>
        )}
        {!isLoading && !error && courseInfo && (
          <div className="p-6 space-y-6">
            {/* Full Description */}
            {courseInfo?.fullDescription?.length > 0 && (
              <div>
                {!whoHeading && (
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Course Content
                  </h3>
                )}
                <div className="space-y-2">
                  {courseInfo.fullDescription.map((desc, index) => {
                    switch (desc.type) {
                      case "paragraph":
                        return (
                          <div
                            key={index}
                            className={`${desc?.heading ? "mb-6" : ""}`}
                          >
                            {desc?.heading && (
                              <h4 className="text-xl font-semibold text-gray-900 mb-1">
                                {desc.heading}
                              </h4>
                            )}

                            <p className="text-gray-700 leading-relaxed text-justify">
                              {desc?.text}
                            </p>
                          </div>
                        );
                      case "list":
                        return (
                          <div key={index} className="mb-6">
                            {desc?.heading && (
                              <h5 className="font-semibold text-gray-900 mb-1">
                                {desc.heading}
                              </h5>
                            )}
                            <ul
                              key={index}
                              className="list-none pl-0 space-y-2 text-gray-700 sm:ms-2 md:ms-10"
                            >
                              {desc.items?.map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                  {/* Icon container: fixed width, always left */}
                                  <span className="shrink-0 w-6 mt-1 text-green-500">
                                    <FaCheckCircle />
                                  </span>

                                  {/* Text container: wraps nicely */}
                                  <span className="flex-1 wrap-break-word">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      case "link":
                        return (
                          <div key={index} className="mb-5 flex gap-1">
                            {desc?.heading && (
                              <h5 className="font-semibold text-gray-900 mb-1">
                                {desc.heading}
                              </h5>
                            )}
                            <a
                              key={index}
                              href={desc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 underline"
                            >
                              {desc.description || desc.url}
                            </a>
                          </div>
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

              {courseInfo?.language && (
                <div>
                  <span className="text-gray-800 font-medium">Language:</span>{" "}
                  <span className="text-gray-600">
                    {courseInfo?.language || "N/A"}
                  </span>
                </div>
              )}

              {courseInfo?.certificate && (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <FaCertificate />
                  Certificate Available
                </div>
              )}
            </div>

            {/* Promo Video */}
            {courseInfo.promoVideoUrl && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800 ">
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
              {
                title: "What You Will Learn",
                data: courseInfo.whatYouWillLearn,
              },
              { title: "Target Audience", data: courseInfo.targetAudience },
            ].map(
              (section) =>
                section.data?.length > 0 && (
                  <div key={section.title}>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {section.title}
                    </h3>
                    <ul className="list-none pl-0 text-gray-700 space-y-1">
                      {section.data.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          {/* Fixed-width icon */}
                          <span className="shrink-0 w-5 mt-1 text-green-500">
                            <FaCheckCircle />
                          </span>

                          {/* Text */}
                          <span className="flex-1 wrap-break-word">
                            {item || "-"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCourseDetails;
