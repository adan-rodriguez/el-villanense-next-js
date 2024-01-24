"use client";

import LoginForm from "@/app/ui/components/LoginForm";
import useLogin from "../hooks/useLogin";

export default function LoginPage() {
  const { loginErrorMessage, getLoginErrorMessage, loading, getLoading } =
    useLogin();

  return (
    <LoginForm
      loginErrorMessage={loginErrorMessage}
      getLoginErrorMessage={getLoginErrorMessage}
      loading={loading}
      getLoading={getLoading}
    />
  );
}
