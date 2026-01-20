import { useApp } from "../hooks/useApp";
import { logoutAPI } from "../services/api/auth";

const Logout = ({setMenuOpen}) => {
  const { setUserinfo, navigate } = useApp();
  const handleLogout = async () => {
    try {
      await logoutAPI();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUserinfo(null);
      navigate("/login");
      setMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-full"
    >
      Logout
    </button>
  );
};

export default Logout;
