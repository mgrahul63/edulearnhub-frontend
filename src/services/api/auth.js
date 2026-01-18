import customaxios from "../axios";

export const checkAuthAPI = () => customaxios.post("/api/auth/check");
export const loginAPI = (state, credential) =>
  customaxios.post(`/api/auth/${state}`, credential);
export const logoutAPI = () => customaxios.post("/api/auth/logout");
export const updateProfileAPI = (data) =>
  customaxios.post("/api/auth/update-profile", data);
