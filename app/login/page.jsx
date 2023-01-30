"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useIsLogin from "../hooks/useIsLogin";
import useLogin from "../hooks/useLogin";
import { handleLoginAuthFirebase } from "../utils/handleLoginAuthFirebase";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const { isUserLogged } = useIsLogin();

  const {
    email,
    password,
    loginErrorMessage,
    setEmail,
    setPassword,
    setLoginErrorMessage,
  } = useLogin();

  const router = useRouter();

  useEffect(() => {
    if (isUserLogged) {
      router.push("/admin");
    }
  }, [isUserLogged]);

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
