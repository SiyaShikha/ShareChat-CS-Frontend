import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import AuthLayout from "../components/AuthLayout";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      footerText="Already have an account?"
      footerActionText="Login"
      onFooterAction={() => navigate("/login")}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
