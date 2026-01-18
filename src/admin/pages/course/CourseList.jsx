import { useEffect, useState } from "react";
import { useApp } from "../../../hooks/useApp";
import { getCoursesAPI } from "../../../services/api/course";
import CourseCard from "../../components/CourseCard";

const CourseList = ({ setFormData, onEdit }) => {
  const { userinfo } = useApp();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCoursesAPI();
        if (res.data.success) setCourses(res.data.courses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, [userinfo]);

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

      {courses?.length ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              OnEdit={() => handleEdit(course)}
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
