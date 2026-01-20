import { NavLink } from "react-router-dom";
import { useApp } from "../../hooks/useApp";
import { SIDEBARMENUS } from "../../utils/sidebar";

const SideBar = () => {
  const { userinfo } = useApp();
  const isDesktop = window.innerWidth > 768;

  if (!isDesktop) return null;

  const menuItems = SIDEBARMENUS[userinfo?.role] || SIDEBARMENUS.educator;

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
