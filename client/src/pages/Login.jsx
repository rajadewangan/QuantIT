import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-cyan-500 to-teal-700 px-4">
      <form
        onSubmit={submitForm}
        className="bg-[#0f1e2e]/80 backdrop-blur-xl w-full max-w-md p-8 rounded-2xl shadow-2xl border border-white/10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-cyan-300">SIGN IN</h2>

          <div className="w-24 h-24 mx-auto rounded-full border-2 border-cyan-400 mt-3 flex justify-center items-center bg-white/10">
            <svg
              className="w-12 h-12 text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 20c0-3.32 2.68-6 6-6h4c3.32 0 6 2.68 6 6"
              />
            </svg>
          </div>
        </div>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        {/* Inputs */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#162635] text-white border border-white/10 placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#162635] text-white border border-white/10 placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            required
          />
        </div>

        {/* Login Button */}
        <button className="w-full bg-cyan-400 hover:bg-cyan-300 transition text-black font-semibold py-3 rounded-lg">
          LOGIN
        </button>

        <p className="text-center text-gray-300 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-300 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
