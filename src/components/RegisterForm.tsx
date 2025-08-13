import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5086/api/user/register",
        { username, password }
      );
      setMessage(response.data);
    } catch (error: any) {
      setMessage(error.response?.data || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="w-full max-w-sm mx-auto p-6 flex flex-col gap-4 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
      >
        Register
      </button>
      {message && (
        <p className="text-center text-sm mt-2 text-gray-700">{message}</p>
      )}
    </form>
  );
}
