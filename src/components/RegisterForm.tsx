import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/user/register`, {
        username,
        password,
      });
      setMessage(response.data);
    } catch (error: any) {
      setMessage(error.response?.data || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        
        <p className="text-gray-600">Create your account to start chatting</p>
      </div>
      
      <form
        onSubmit={handleRegister}
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
            placeholder="Choose a username"
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
            placeholder="Create a password"
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 placeholder-gray-400 transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300 font-semibold mt-4 shadow-lg"
        >
          Create Account
        </button>

        {message && (
          <div className="text-center text-sm mt-3 font-medium py-2 px-4 rounded-lg text-gray-700 bg-gray-50">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
