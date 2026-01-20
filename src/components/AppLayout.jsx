import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />

      <main className="flex-1 w-full px-2 sm:px-2 lg:px-2">
        <div className="mx-auto">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
