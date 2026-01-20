import { useQuery } from "@tanstack/react-query";
import { useApp } from "../../../hooks/useApp";
import { getCoursesAPI } from "../../../services/api/course";
import CourseCard from "../../components/CourseCard";
const CourseList = ({ setFormData, onEdit }) => {
  const { userinfo } = useApp();

  const { data, error, isLoading } = useQuery({
    queryKey: ["courses", userinfo],
    queryFn: getCoursesAPI,
    enabled: !!userinfo,
  });

  const handleEdit = (course) => {
    setFormData({
      ...course,
      method: "edit",
      id: course.id,
    });
    onEdit?.(); // switch to form tab if needed
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Courses</h2>

      {isLoading ? (
        <p className="text-center">Loading courses...</p>
      ) : data?.success && data?.courses?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              OnEdit={() => handleEdit(course)} // camelCase
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No courses found.</p>
      )}
    </div>
  );
};

export default CourseList;
