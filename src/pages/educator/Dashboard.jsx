// Dashboard.jsx
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import CategoryButton from "../../components/CategoryButton";
import CourseCard from "../../components/CourseCard";
import NotFoundData from "../../components/NotFoundData";
import { useApp } from "../../hooks/useApp";
import { getCoursesAPI } from "../../services/api/course"; // must accept page, limit, category
import { useCategory } from "../../hooks/useCategory";

const Dashboard = () => {
  const { userinfo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: categoriesData, isLoading: categoryLoading } = useCategory(
    userinfo?.id,
  );

  // Infinite query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["courses", userinfo, selectedCategory],
    queryFn: ({ pageParam = 1 }) =>
      getCoursesAPI({
        page: pageParam,
        limit: 10,
        categoryId: selectedCategory,
        status: "published",
      }),
    enabled: !!userinfo,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.courses || lastPage.courses?.length < 10) return undefined;
      return pages.length + 1;
    },
  });
  // Intersection Observer for infinite scroll
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

  // Flatten pages into a single array
  const courses = data?.pages?.flatMap((page) => page.courses || []) || [];

  const handleExamClick = () => {
    console.log("just see");
  };
  return (
    <div className="mx-auto py-6">
      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Categories</h2>
        <div className="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible">
          <CategoryButton
            category_name={"All"}
            onClick={() => setSelectedCategory("all")}
          />
          {categoryLoading && (
            <p className="px-4 py-2 text-sm sm:text-base rounded-full whitespace-nowrap ">
              Loading categories...
            </p>
          )}

          {categoriesData?.map((category) => (
            <CategoryButton
              key={category?.id}
              category_name={category?.category_name}
              onClick={() => setSelectedCategory(category?.id)}
            />
          ))}

          {/* {categoriesData && (
            <CategoryButton
              category_name={"Stu-Exam Hub"}
              onClick={() => handleExamClick()}
            />
          )} */}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {isLoading ? (
          <p className="col-span-full text-center">Loading courses...</p>
        ) : error ? (
          <p className="col-span-full text-center text-red-500">
            Failed to load courses
          </p>
        ) : courses.length > 0 ? (
          courses.map((course, idx) => {
            const isLastCourse = idx === courses.length - 1;
            return (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={() => handleEdit(course)}
                purchased={true}
                ref={isLastCourse ? lastCourseRef : null}
              />
            );
          })
        ) : (
          <NotFoundData message={data?.pages[0].message} />
        )}
        {isFetchingNextPage && (
          <p className="col-span-full text-center mt-4">Loading more...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
