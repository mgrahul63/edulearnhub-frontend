import { useState } from "react";
import CourseCard from "../../../components/CourseCard";
import NotFoundData from "../../../components/NotFoundData";
import { useApp } from "../../../hooks/useApp";
import { useCategory } from "../../../hooks/useCategory";
import { useInfiniteCourses } from "../../../hooks/useInfiniteCourses";

const CourseList = ({ setFormData, onEdit }) => {
  const { userinfo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: categoriesData, error } = useCategory(userinfo?.id);

  const { data, lastCourseRef, isLoading, isFetchingNextPage } =
    useInfiniteCourses({
      userId: userinfo?.id,
      selectedCategory,
    });

  const handleEdit = (course) => {
    setFormData({
      ...course,
      method: "edit",
      id: course.id,
    });
    onEdit?.();
  };

  const courses = data?.pages.flatMap((page) => page.courses) || [];

  return (
    <div>
      {/* Categories */}
      <div className="mb-4">
        <div className="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 text-sm sm:text-base rounded-full whitespace-nowrap cursor-pointer${
              selectedCategory === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>

          {categoriesData?.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`px-4 py-2 text-sm sm:text-base rounded-full whitespace-nowrap cursor-pointer ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category?.category_name}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <p className="text-center">Loading courses...</p>
      ) : courses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, idx) => {
            const isLastCourse = idx === courses.length - 1;
            return (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={() => handleEdit(course)}
                ref={isLastCourse ? lastCourseRef : null}
              />
            );
          })}
          {isFetchingNextPage && (
            <p className="col-span-full text-center mt-4">Loading more...</p>
          )}
        </div>
      ) : (
        <NotFoundData message={data?.pages[0].message} />
      )}
    </div>
  );
};

export default CourseList;
