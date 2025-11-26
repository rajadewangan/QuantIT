import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/register", data);

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
        <h2 className="text-xl font-bold text-cyan-300 text-center mb-6">
          CREATE ACCOUNT
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <input
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-[#162635] text-white border border-white/10 placeholder-gray-400 focus:border-cyan-400 focus:outline-none mb-3"
        />

        <input
          type="date"
          name="dob"
          value={data.dob}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-[#162635] text-white border border-white/10 focus:border-cyan-400 focus:outline-none mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-[#162635] text-white border border-white/10 placeholder-gray-400 focus:border-cyan-400 focus:outline-none mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-[#162635] text-white border border-white/10 placeholder-gray-400 focus:border-cyan-400 focus:outline-none mb-4"
        />

        <button className="w-full bg-cyan-400 hover:bg-cyan-300 transition text-black font-semibold py-3 rounded-lg">
          REGISTER
        </button>

        <p className="text-center text-gray-300 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-300 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
