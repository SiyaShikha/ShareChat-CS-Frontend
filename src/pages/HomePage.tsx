import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to ShareChat
      </h1>
      <p className="text-center mb-8 text-gray-700">
        ShareChat is a platform where you can connect with friends, share your
        thoughts, and engage in meaningful conversations.
      </p>

      <div className="mb-8 text-center">
        <p className="text-lg font-semibold">Already have an account?</p>
        <p className="text-sm text-gray-500">Login to continue</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
      <div className="mb-8 text-center">
        <p className="text-lg font-semibold">New to ShareChat?</p>
        <p className="text-sm text-gray-500">Register to create an account</p>
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
