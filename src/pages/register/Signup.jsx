import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { loginAPI } from "../../services/api/auth";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await loginAPI("signup", {
        ...formData,
        id: uuidv4(),
      });

      if (data.success) {
        alert("Account created successfully!");
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2 rounded-xl outline-none bg-white/80 text-gray-800 placeholder-gray-600 focus:ring-2";

  return (
    <div className="flex items-center justify-center bg-blue-300  pb-55 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 mt-15">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={`${inputClass} focus:ring-purple-400 outline-none`}
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className={`${inputClass} focus:ring-pink-400 outline-none`}
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create Password"
            className={`${inputClass} focus:ring-blue-400 outline-none`}
            required
          />

          {error && (
            <p className="text-red-300 text-sm text-center font-medium bg-red-500/20 py-1 rounded-lg">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:scale-[1.03] hover:bg-gray-900"
            }`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-white text-sm mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-300 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
