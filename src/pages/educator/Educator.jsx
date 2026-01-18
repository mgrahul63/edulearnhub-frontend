import { Outlet } from "react-router-dom";
import SideBar from "../../components/educator/SideBar";

const Educator = () => {
  return (
    <div className="flex">
      <SideBar />
      {/* Dashboard / nested route will show here */}
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Educator;
