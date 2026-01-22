import { FaCertificate, FaCheckCircle, FaVideo } from "react-icons/fa";

const CourseDetailsCard = ({ courseInfo }) => {
  if (!courseInfo) return null;
  return (
    <div className="mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-6">
        {/* Full Description */}
        {courseInfo?.fullDescription?.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Course Content
            </h3>
            <div className="space-y-4">
              {courseInfo?.fullDescription.map((desc, index) => {
                switch (desc.type) {
                  case "paragraph":
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {desc.text}
                      </p>
                    );
                  case "list":
                    return (
                      <ul className="list-none pl-0 space-y-2 text-gray-700 ms-20">
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
          {courseInfo?.totalDuration != 0 && courseInfo?.totalLessons != 0 && (
            <div className="flex items-center gap-2">
              <FaVideo className="text-indigo-500" />
              <span className="text-gray-800 font-medium">
                {courseInfo.totalDuration || 0} mins •{" "}
                {courseInfo.totalLessons || 0} Lessons
              </span>
            </div>
          )}

          {courseInfo?.level && (
            <div className="flex items-center gap-2">
              <span className="text-gray-800 font-medium">Level:</span>
              <span className="text-gray-600">
                {courseInfo?.level || "Beginner"}
              </span>
            </div>
          )}

          {courseInfo?.language && (
            <div>
              <span className="text-gray-800 font-medium">Language:</span>{" "}
              <span className="text-gray-600">
                {courseInfo.language || "N/A"}
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
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
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
        ]?.map(
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
    </div>
  );
};

export default CourseDetailsCard;
