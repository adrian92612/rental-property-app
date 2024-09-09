import { LoginForm } from "@/components/auth/login-form";
import { LoginSocialForm } from "@/components/auth/login-social-form";

const LoginPage = () => {
  return (
    <div className="w-11/12 max-w-[300px] space-y-2">
      <LoginForm />
      <div className="flex justify-center items-center gap-2">
        <div className="flex-grow bg-gray-200 h-px"></div>
        <span>or</span>
        <div className="flex-grow bg-gray-200 h-px"></div>
      </div>
      <LoginSocialForm />
    </div>
  );
};

export default LoginPage;
