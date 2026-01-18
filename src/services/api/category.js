import customaxios from "../axios";

export const addCategoryAPI = (data) =>
  customaxios.post("/api/admin/add-category", data);
export const getCategoryAPI = () => customaxios.get("/api/admin/get-category");
