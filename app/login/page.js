"use client";

import LoginForm from "@/app/ui/components/LoginForm";
import useLogin from "../hooks/useLogin";

export default function LoginPage() {
  const { loginErrorMessage, getLoginErrorMessage } = useLogin();

  return (
    <LoginForm
      loginErrorMessage={loginErrorMessage}
      getLoginErrorMessage={getLoginErrorMessage}
    />
  );
}
