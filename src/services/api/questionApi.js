import customaxios from "../axios";

// --- Create Question ---
export const createQuestionAPI = async (data) => {
  try {
    const res = await customaxios.post("/api/admin/question", data);
    return res.data; // return backend response
  } catch (error) {
    console.error("Create question failed:", error);
    throw error;
  }
};

// --- Update Question ---
export const updateQuestionAPI = async (data) => {
  try {
    const res = await customaxios.put("/api/admin/question", data);
    return res.data; // return backend response
  } catch (error) {
    console.error("Update question failed:", error);
    throw error;
  }
};

// --- Get all questions for a book + chapter ---
export const getQuestionsAPI = async (bookId, chapterId) => {
  try {
    if (!bookId || !chapterId) {
      throw new Error("Both bookId and chapterId are required");
    }

    const res = await customaxios.get(
      `/api/admin/questions?bookId=${bookId}&chapterId=${chapterId}`,
    );

    return res.data; // { success: true, data: [...] }
  } catch (error) {
    console.error("Fetch questions failed:", error);
    throw error;
  }
};

// --- Get single question by id ---
export const getQuestionByIdAPI = async (questionId) => {
  try {
    const res = await customaxios.get(`/api/admin/question/${questionId}`);
    return res.data; // { success: true, data: {...} }
  } catch (error) {
    console.error("Fetch question by id failed:", error);
    throw error;
  }
};

export const answerAPI = async (data) => {
  try {
    const res = await customaxios.post("/api/admin/add-answer", data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error; // propagate error to frontend
  }
};

export const getAnswerAPI = async (bookId, chapterId, studentId) => {
  try {
    // Build query string
    const params = new URLSearchParams();
    if (bookId) params.append("bookId", bookId);
    if (chapterId) params.append("chapterId", chapterId);
    if (studentId) params.append("studentId", studentId);

    const res = await customaxios.get(
      `/api/admin/get-answers?${params.toString()}`,
    );

    return res.data; // { success: true, data: [...] }
  } catch (error) {
    console.error("Error fetching answers:", error);
    return { success: false, data: [], message: "Failed to fetch answers" };
  }
};
