import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import AuthLayout from "../components/AuthLayout";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      footerText="New to ShareChat?"
      footerActionText="Create an account"
      onFooterAction={() => navigate("/register")}
    >
      <LoginForm />
    </AuthLayout>
  );
}
