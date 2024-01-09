"use client";

import LoginForm from "@/app/ui/components/LoginForm";
import useAuth from "@/app/hooks/useAuth";
import { redirect } from "next/navigation";
import { routes } from "../lib/routes";

export default function LoginPage() {
  const {
    email,
    password,
    loginErrorMessage,
    getEmail,
    getPassword,
    getLoginErrorMessage,
    user,
  } = useAuth();

  if (user) redirect(routes.dashboard.root);

  return (
    <LoginForm
      email={email}
      password={password}
      loginErrorMessage={loginErrorMessage}
      getEmail={getEmail}
      getPassword={getPassword}
      getLoginErrorMessage={getLoginErrorMessage}
    />
  );
}
