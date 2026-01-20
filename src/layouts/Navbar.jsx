import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import LoginCreate from "../components/LoginCreate";
import Logout from "../components/Logout";
import { useApp } from "../hooks/useApp";
import { SIDEBARMENUS } from "../utils/sidebar";

const Navbar = () => {
  const { userinfo, setUserinfo, navigate } = useApp();
  const { pathname } = useLocation();
  const isCourseList = pathname.includes("/course-list");

  const [menuOpen, setMenuOpen] = useState(false);

  const sidebarMenu = SIDEBARMENUS[userinfo?.role] || SIDEBARMENUS.educator;

  const EducatorButton = () => {
    if (!userinfo) return null;

    const navItemSideBar = sidebarMenu.map(({ name, path }) => (
      <NavLink
        key={name}
        to={path}
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `px-4 py-2 rounded hover:bg-gray-200 ${
            isActive ? "bg-blue-500 text-white" : "text-gray-700"
          }`
        }
      >
        {name}
      </NavLink>
    ));

    const navItemTopBar = (
      <NavLink
        to={
          userinfo.role === "admin"
            ? "/admin/my-enrollments"
            : "/my-enrollments"
        }
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `px-3 py-1 rounded hover:bg-gray-200 ${
            isActive ? "bg-blue-500 text-white" : "text-gray-700"
          }`
        }
      >
        Enrollments
      </NavLink>
    );

    return { navItemSideBar, navItemTopBar };
  };

  return (
    <>
      <nav
        className={`w-full flex items-center justify-between
        px-2 sm:px-2 md:px-14 lg:px-10 py-4 border-b border-gray-500
        ${isCourseList ? "bg-white" : "bg-cyan-100/70"}`}
      >
        <img
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate("/")}
          className="w-15 cursor-pointer rounded-t-full"
        />

        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        {/* Desktop */}
        <div className="hidden md:flex h-full items-center gap-5 text-gray-500">
          {userinfo ? (
            <>
              <Link
                to={userinfo.role === "admin" ? "/admin/educator" : "/educator"}
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
              >
                {" "}
                Dashboard
              </Link>
              {EducatorButton()?.navItemTopBar}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{userinfo.name}</span>
                <Logout setMenuOpen={setMenuOpen} />
              </div>
            </>
          ) : (
            <LoginCreate />
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden">
          <div className="absolute top-0 right-0 w-50 bg-white z-50 p-3 flex flex-col gap-1 rounded-bl-xl">
            <button
              className="self-end text-xl"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            {userinfo ? (
              <>
                {EducatorButton()?.navItemSideBar}
                {EducatorButton()?.navItemTopBar}
                <Logout setMenuOpen={setMenuOpen} />
              </>
            ) : (
              <LoginCreate onclick={() => setMenuOpen(false)} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
