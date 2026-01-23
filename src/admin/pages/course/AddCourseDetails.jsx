import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../../assets/assets";
import {
  courseDetailsAPI,
  getCourseDetailsAPI,
} from "../../../services/api/course";
import CourseDetailsCard from "../../components/CourseDetailsCard";
import CourseDetailsForm from "../../components/CourseDetailsForm";
import HeadingForCourseDetails from "../../../components/HeadingForCourseDetails";

const EMPTY_DETAILS = {
  fullDescription: [{ type: "paragraph", heading: "", text: "" }],
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: () => getCourseDetailsAPI(courseId),
    enabled: !!courseId,
    initialData: course ? course : undefined,
  });

  // courseDetails stays same
  const courseDetails = data?.success
    ? { courseId, ...data.data }
    : { courseId, ...EMPTY_DETAILS };

  const handleSubmit = async (updatedData) => {
    const res = await courseDetailsAPI(updatedData);
    data.data = updatedData;
    toast.success(res.message || "Course details saved successfully");
    setEdit(false);
  };

  if (isLoading || !courseDetails) return null;

  return (
    <div className="w-full">
      {/* course header */}
     <HeadingForCourseDetails course={course} />

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
              onPreviewChange={(updated) => (data.data = updated)} // keep live preview
            />

            <button
              onClick={() => setEdit(false)}
              className="inline px-4 py-2 font-medium border-2  bg-indigo-500 text-white cursor-pointer rounded-xl"
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
