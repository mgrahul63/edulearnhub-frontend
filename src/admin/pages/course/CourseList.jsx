import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import CourseCard from "../../../components/CourseCard";
import NotFoundData from "../../../components/NotFoundData";
import { useApp } from "../../../hooks/useApp";
import { getCategoryAPI } from "../../../services/api/category";
import { getCoursesAPI } from "../../../services/api/course";

const CourseList = ({ setFormData, onEdit }) => {
  const { userinfo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: categoriesData } = useQuery({
    queryKey: ["category", userinfo],
    queryFn: getCategoryAPI,
    enabled: !!userinfo,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["courses-list", userinfo, selectedCategory],
    queryFn: ({ pageParam = 1 }) =>
      getCoursesAPI({
        page: pageParam,
        limit: 10,
        categoryId: selectedCategory,
      }),
    enabled: !!userinfo,
    getNextPageParam: (lastPage, pages) =>
      lastPage.courses.length < 10 ? undefined : pages.length + 1,
  });

  const observer = useRef();
  const lastCourseRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

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
              key={category}
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
