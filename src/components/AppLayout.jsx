import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
