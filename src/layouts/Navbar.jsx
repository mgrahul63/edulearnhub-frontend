import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useApp } from "../hooks/useApp";
import { logoutAPI } from "../services/api/auth";

const Navbar = () => {
  const { userinfo, setUserinfo, navigate, isEducator } = useApp();
  const { pathname } = useLocation();
  const isCourseList = pathname.includes("/course-list");

  const handleLogout = async () => {
    try {
      await logoutAPI();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUserinfo(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const EducatorButton = ({ short }) => {
    if (!userinfo) return null;

    return (
      <>
        <Link to={userinfo.role === "admin" ? "/admin/educator" : "/educator"}>
          {isEducator
            ? short
              ? "Dashboard"
              : "Educator Dashboard"
            : short
            ? "Educator"
            : "Become Educator"}
        </Link>

        <Link
          to={
            userinfo.role === "admin"
              ? "/admin/my-enrollments"
              : "/my-enrollments"
          }
        >
          {short ? "Enrollments" : "My Enrollments"}
        </Link>
      </>
    );
  };

  return (
    <div
      className={`flex items-center justify-between
  px-4 sm:px-10 md:px-14 lg:px-36 py-4 border-b border-gray-500
  ${isCourseList ? "bg-white" : "bg-cyan-100/70"}`}
    >
      <img
        src={assets.logo}
        alt="Logo"
        onClick={() => navigate("/")}
        className="w-15 lg:w-15 cursor-pointer rounded-t-full"
      />

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <EducatorButton />
        {userinfo ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{userinfo.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-5 py-2 rounded-full"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center gap-3 text-gray-500">
        <EducatorButton short />
        {userinfo ? (
          <div className="flex items-center gap-2">
            <span className="text-xs max-w-[80px] truncate">
              {userinfo.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-full text-xs"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <img src={assets.user_icon} alt="User" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
