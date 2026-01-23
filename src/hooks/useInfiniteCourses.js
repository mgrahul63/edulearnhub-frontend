import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { getCoursesAPI } from "../services/api/course";

export const useInfiniteCourses = ({ userId, selectedCategory }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["courses-list", userId, selectedCategory],
    queryFn: ({ pageParam = 1 }) =>
      getCoursesAPI({
        page: pageParam,
        limit: 10,
        categoryId: selectedCategory,
        status: null,
        instructorId: userId,
      }),
    enabled: !!userId,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.courses?.length < 10 ? undefined : pages.length + 1,
    staleTime: 1000 * 60 * 5,
  });

  const observer = useRef(null);

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

  return {
    data,
    lastCourseRef,
    isLoading,
    isFetchingNextPage,
    error,
  };
};
