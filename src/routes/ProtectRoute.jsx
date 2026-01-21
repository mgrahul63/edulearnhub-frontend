import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../hooks/useApp";

const ProtectRoute = () => {
  const { userinfo } = useApp();
  const token = localStorage.getItem("token");
  const isAuth = Boolean(token || userinfo?.role);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectRoute;
