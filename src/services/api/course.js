import customaxios from "../axios";

export const courseAPI = (state) => customaxios.get(`/api/auth/${state}`);

export const addCourseAPI = (data) =>
  customaxios.post("/api/admin/add-course", data);

// services/api/course.js
export const getCoursesAPI = async ({
  page = 1,
  limit = 15,
  categoryId = "all",
  status = null,
}) => {
  try {
    const query = new URLSearchParams({ page, limit, categoryId, status });

    const res = await customaxios.get(
      `/api/admin/get-course?${query.toString()}`,
    );
    return res.data; // { success: true, courses: [...] }
  } catch (error) {
    console.error("Get courses failed:", error);
  }
};

export const getCoursesDetailsAPI = async (courseId) => {
  try {
    const res = await customaxios.get("/api/auth/get-course-details", {
      params: { courseId },
    });
    return res.data;
  } catch (error) {
    console.error("Get course details failed:", error);
    throw error; // let the caller handle it
  }
};

export const courseDetailsAPI = (data) =>
  customaxios.post("api/admin/add-course-details", data);

export const getCourseDetailsAPI = async (courseId) => {
  try {
    const res = await customaxios.get("api/admin/get-course-details", {
      params: { courseId },
    });
    return res.data;
  } catch (error) {
    console.error("Get course details failed:", error);
    throw error; // let React Query handle it
  }
};
