import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/user/login`,
        { username, password },
        { withCredentials: true }
      );

      setMessage("Login successful!");
      navigate("/chatroom");
    } catch (error: any) {
      setMessage(error.response?.data || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <p className="text-gray-600">Sign in to your account to continue</p>
      </div>
      
      <form
        onSubmit={handleLogin}
        className="w-full bg-white rounded-2xl shadow-2xl p-10 flex flex-col gap-5 border border-gray-100"
      >
        <div className="space-y-1">
          <label htmlFor="username" className="text-sm font-semibold text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300 font-semibold mt-4 shadow-lg"
        >
          Sign In
        </button>

        {message && (
          <div
            className={`text-center text-sm mt-3 font-medium py-2 px-4 rounded-lg ${
              message === "Login successful!"
                ? "text-green-700 bg-green-50"
                : "text-red-700 bg-red-50"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
