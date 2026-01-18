import customaxios from "../axios";

export const courseAPI = (state) => customaxios.get(`/api/auth/${state}`);

export const addCourseAPI = (data) =>
  customaxios.post("/api/admin/add-course", data);

export const getCoursesAPI = () => customaxios.get("/api/admin/get-course");
export const getCoursesDetailsAPI = (courseId) =>
  customaxios.get("/api/auth/get-course-details", { params: { courseId } });

export const courseDetailsAPI = (data) =>
  customaxios.post("api/admin/add-course-details", data);

export const getCourseDetailsAPI = (courseId) =>
  customaxios.get("api/admin/get-course-details", { params: { courseId } });
