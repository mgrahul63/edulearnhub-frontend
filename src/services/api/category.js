import customaxios from "../axios";

export const addCategoryAPI = (data) =>
  customaxios.post("/api/admin/add-category", data);
export const getCategoryAPI = async () => {
  try {
    const res = await customaxios.get("/api/admin/get-category");

    return res.data.categories || [];
  } catch (error) {
    console.error("Get courses failed:", error);
    throw error; // important: let React Query handle it
  }
};
