"use client";

import LoginForm from "@/app/components/LoginForm";
import useLogin from "@/app/hooks/useLogin";
import { handleLoginAuthFirebase } from "@/app/utils/handleLoginAuthFirebase";
import { redirect } from "next/navigation";

export const metadata = {
  robots: {
    index: false,
  },
};

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

  if (user) redirect("/dashboard");

  return (
    <LoginForm
      email={email}
      password={password}
      loginErrorMessage={loginErrorMessage}
      setEmail={setEmail}
      setPassword={setPassword}
      login={() => {
        setLoginErrorMessage(null);
        handleLoginAuthFirebase(email, password, setLoginErrorMessage);
      }}
    />
  );
}
