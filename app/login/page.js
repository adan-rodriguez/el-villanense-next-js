"use client";

import LoginForm from "@/app/ui/components/LoginForm";
import useAuth from "@/app/hooks/useAuth";

export default function LoginPage() {
  const {
    email,
    password,
    loginErrorMessage,
    getEmail,
    getPassword,
    getLoginErrorMessage,
  } = useAuth();

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
