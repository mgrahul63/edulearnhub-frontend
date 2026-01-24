import { Outlet } from "react-router-dom";
import SideBar from "../../components/educator/SideBar";
import { scrollToTop } from "../../utils/scrollToTop";

const Educator = () => {
  scrollToTop();
  return (
    <div className="block md:flex min-h-screen">
      {/* Sidebar: hidden on small, visible from md up */}
      <div className="hidden md:block">
        <SideBar />
      </div>

      {/* Main content */}
      <div className="w-full px-1 md:px-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Educator;
