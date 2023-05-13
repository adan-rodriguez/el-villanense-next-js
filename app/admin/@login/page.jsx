"use client";

import LoginForm from "@/app/components/LoginForm";
import useLogin from "@/app/hooks/useLogin";
import { handleLoginAuthFirebase } from "@/app/utils/handleLoginAuthFirebase";

export default function LoginPage() {
  const {
    email,
    password,
    loginErrorMessage,
    setEmail,
    setPassword,
    setLoginErrorMessage,
  } = useLogin();

  return (
    <LoginForm
      email={email}
      password={password}
      loginErrorMessage={loginErrorMessage}
      setEmail={setEmail}
      setPassword={setPassword}
      login={() =>
        handleLoginAuthFirebase(email, password, setLoginErrorMessage)
      }
    />
  );
}
