import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto p-4 sm:p-6 h-screen w-screen">
      <header className="flex items-center justify-center mb-6">
        <h1 className="text-4xl sm:text-7xl font-bold text-center mt-2 text-purple-400">
          Create Your Account
        </h1>
      </header>

      <main className="mb-8 max-w-3xl mx-auto p-4 sm:p-6 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left column - Form */}
        <div className="flex-1 w-full md:w-1/2">
          <RegisterForm />
        </div>

        {/* Right column - Image */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div className="flex-1 w-32 h-48 sm:w-48 sm:h-72 md:w-80 md:h-140 chat-bg"></div>
        </div>
      </main>

      <footer className="text-center mt-8">
        <div className="text-center mt-10">
          <p className="text-lg font-semibold">Proceed to Login</p>
          <button
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </footer>
    </div>
  );
}
