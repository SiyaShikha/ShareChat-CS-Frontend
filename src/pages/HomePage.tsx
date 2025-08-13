import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to ShareChat
      </h1>
      <p className="text-center mb-8 text-gray-700">
        ShareChat is a platform where you can connect with friends, share your
        thoughts, and engage in meaningful conversations.
      </p>

      <div className="mb-8 max-w-md mx-auto bg-white p-6 rounded shadow">
        <LoginForm />
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold">New to ShareChat?</p>
        <button
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}
