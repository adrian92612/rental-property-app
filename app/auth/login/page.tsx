import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <div className="w-11/12 max-w-[300px]">
      <LoginForm />
      <div className="flex justify-center items-center gap-2">
        <div className="flex-grow bg-gray-200 h-px"></div>
        <span>or</span>
        <div className="flex-grow bg-gray-200 h-px"></div>
      </div>
    </div>
  );
};

export default LoginPage;
