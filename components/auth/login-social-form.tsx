import { loginSocial } from "@/lib/actions/actions";
import { Button } from "../ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const LoginSocialForm = async () => {
  return (
    <form action={loginSocial} className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        name="action"
        value="google"
        className="flex-grow border-primary"
      >
        <FaGoogle className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        name="action"
        value="github"
        className="flex-grow border-primary"
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </form>
  );
};
