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
    console.log(isUserLogged);
    if (isUserLogged) {
      router.push("/dashboard/nuevo-articulo");
    }
  }, []);

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
