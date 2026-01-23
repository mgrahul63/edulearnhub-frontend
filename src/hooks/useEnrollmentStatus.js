// hooks/useEnrollmentStatus.js
import { useQuery } from "@tanstack/react-query";
import { checkEnrollmentAPI } from "../services/api/course";

export const useEnrollmentStatus = (courseId, userId) => {
  return useQuery({
    queryKey: ["enrollment-status", courseId, userId],
    queryFn: () => checkEnrollmentAPI(courseId, userId),
    enabled: !!courseId && !!userId,
  });
};
