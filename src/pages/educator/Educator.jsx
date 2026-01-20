import { Outlet } from "react-router-dom";
import SideBar from "../../components/educator/SideBar";

const Educator = () => {
  return (
    <div className="block lg:flex min-h-screen">
      {/* Sidebar: hidden on small, visible on large */}
      <div className="hidden lg:block">
        <SideBar />
      </div>

      {/* Main content */}
      <div className="w-full flex-1 lg:px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Educator;
