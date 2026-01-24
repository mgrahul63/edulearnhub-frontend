import customaxios from "../axios";

export const addBookAPI = async (fd) => {
  try {
    const res = await customaxios.post("api/admin/book", fd);
    return res.data;
  } catch (error) {
    console.error("Add chapter failed:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
export const updateBookAPI = async (fd) => {
  try {
    const res = customaxios.put("api/admin/book", fd);
    return res.data;
  } catch (error) {
    console.error("Add chapter failed:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
export const getBookAPI = async (courseId) => {
  try {
    const res = await customaxios.get("api/admin/books", {
      params: { courseId },
    });
    return res.data;
  } catch (error) {
    console.error("Add chapter failed:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const delteBookAPI = async (id) => {
  try {
    const res = await customaxios.delete("api/admin/delete-book", {
      data: { id },
    });
    return res.data; // server response
  } catch (error) {
    console.error("Failed to delete chapter:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Server error",
    };
  }
};
export const chapterAPI = async (data) => {
  try {
    const res = await customaxios.post("api/admin/add-chapter", data);
    return res.data;
  } catch (error) {
    console.error("Add chapter failed:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getChapterAPI = async (courseId, bookId) => {
  try {
    const res = await customaxios.get(`api/admin/chapters/`, {
      params: { courseId, bookId },
    });
    return res.data;
  } catch (error) {
    console.error("Get chapters failed:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const deleteChapter = async (chapterId) => {
  try {
    const res = await customaxios.delete("/api/admin/delete-chapter", {
      data: { chapterId },
    });
    return res.data; // server response
  } catch (error) {
    console.error("Failed to delete chapter:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Server error",
    };
  }
};
