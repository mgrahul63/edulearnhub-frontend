import { Link } from "react-router-dom";

const LoginCreate = ({ onclick = null }) => {
  return (
    <div className="flex items-center gap-3">
      <Link
        to="/login"
        onClick={onclick}
        className="text-blue-600 font-medium cursor-pointer"
      >
        Login
      </Link>

      <Link
        to="/signup"
        onClick={onclick}
        className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
      >
        Create Account
      </Link>
    </div>
  );
};

export default LoginCreate;
