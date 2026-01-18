import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useApp } from "../../hooks/useApp";

const MENUS = {
  admin: [
    { name: "Dashboard", path: "/admin/educator", icon: assets.home_icon },
    { name: "Manage Users", path: "admin/users", icon: assets.user_icon },
    {
      name: "Manage Categories",
      path: "admin/categories",
      icon: assets.category_icon,
    },
    { name: "Manage Courses", path: "admin/courses", icon: assets.cross_icon },
  ],
  educator: [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "My Courses", path: "my-courses", icon: assets.my_course_icon },
    {
      name: "Student Enrolled",
      path: "students-enrolled",
      icon: assets.person_tick_icon,
    },
  ],
};

const SideBar = () => {
  const { userinfo } = useApp();
  const isDesktop = window.innerWidth > 768;

  if (!isDesktop) return null;

  const menuItems = MENUS[userinfo?.role] || MENUS.educator;

  return (
    <div className="w-64 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col">
      {menuItems.map(({ name, path, icon }) => (
        <NavLink
          key={name}
          to={path}
          className={({ isActive }) =>
            `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${
              isActive
                ? "bg-indigo-50 border-r-[6px] border-indigo-500/90"
                : "hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90"
            }`
          }
        >
          <img src={icon} alt={name} className="w-6 h-6" />
          <p className="md:block hidden whitespace-nowrap">{name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
