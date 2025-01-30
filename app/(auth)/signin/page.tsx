import { GitHubLoginButton } from "@/src/components/github-signin-button";
import { LoginForm } from "@/src/components/login-form";

export default function SignIn() {
  return (
    <div>
      <LoginForm />
      <GitHubLoginButton />
    </div>
  );
}
