import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { assets } from "../../../assets/assets";
import {
  courseDetailsAPI,
  getCourseDetailsAPI,
} from "../../../services/api/course";
import CourseDetailsCard from "../../components/CourseDetailsCard";
import CourseDetailsForm from "../../components/CourseDetailsForm";

const EMPTY_DETAILS = {
  fullDescription: [{ type: "paragraph", text: "" }],
  requirements: [""],
  whatYouWillLearn: [""],
  targetAudience: [""],
  totalDuration: 0,
  totalLessons: 0,
  language: "",
  level: "beginner",
  promoVideoUrl: "",
  certificate: false,
};

const AddCourseDetails = () => {
  const { courseId } = useParams();
  const { state } = useLocation();
  const course = state?.course;

  const [edit, setEdit] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    (async () => {
      try {
        const res = await getCourseDetailsAPI(courseId);
        setCourseDetails(
          res.data.success ? res.data.data : { courseId, ...EMPTY_DETAILS }
        );
      } catch {
        setCourseDetails({ courseId, ...EMPTY_DETAILS });
      }
    })();
  }, [courseId]);

  const handleSubmit = async (data) => {
    await courseDetailsAPI(data);
    setCourseDetails(data);
    setEdit(false);
  };

  if (!courseDetails) return null;

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

      <div className="flex gap-3 mt-5">
        <div className={edit ? "w-7/12" : "w-full"}>
          <CourseDetailsCard courseInfo={courseDetails} />
          {!edit && (
            <button
              onClick={() => setEdit(true)}
              className="px-4 py-2 font-medium border-2  bg-indigo-500 text-white cursor-pointer rounded-xl"
            >
              Edit
            </button>
          )}
        </div>

        {edit && (
          <div className="w-5/12 p-5 bg-gray-100 rounded">
            <CourseDetailsForm
              initialData={courseDetails}
              onSubmit={handleSubmit}
              onPreviewChange={setCourseDetails}
            />

            <button
              onClick={() => setEdit(false)}
              className="px-4 py-2 font-medium border-2  bg-indigo-500 text-white cursor-pointer rounded-xl"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCourseDetails;
