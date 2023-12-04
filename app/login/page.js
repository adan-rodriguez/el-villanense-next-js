"use client";

import LoginForm from "@/app/ui/components/LoginForm";
import useLogin from "@/app/hooks/useLogin";
import { redirect } from "next/navigation";
import { routes } from "../lib/routes";
import { handleLogin } from "../lib/auth";

export default function LoginPage() {
  const {
    email,
    password,
    loginErrorMessage,
    setEmail,
    setPassword,
    setLoginErrorMessage,
    user,
  } = useLogin();

  if (user) redirect(routes.dashboard.root);

  return (
    <LoginForm
      email={email}
      password={password}
      loginErrorMessage={loginErrorMessage}
      setEmail={setEmail}
      setPassword={setPassword}
      setLoginErrorMessage={setLoginErrorMessage}
    />
  );
}
