"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLogin from "../hooks/useLogin";
import { handleLoginAuthFirebase } from "../utils/handleLoginAuthFirebase";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const {
    email,
    password,
    loginErrorMessage,
    setEmail,
    setPassword,
    setLoginErrorMessage,
    isUserLogged,
  } = useLogin();

  const router = useRouter();

  useEffect(() => {
    if (isUserLogged) {
      router.push("/dashboard/nuevo-articulo");
    }
  }, [isUserLogged]);

  return (
    <LoginForm
      email={email}
      password={password}
      loginErrorMessage={loginErrorMessage}
      setEmail={setEmail}
      setPassword={setPassword}
      login={async () =>
        await handleLoginAuthFirebase(email, password, setLoginErrorMessage)
      }
    />
  );
}
