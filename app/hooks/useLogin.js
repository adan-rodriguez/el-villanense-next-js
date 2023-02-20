import { LoginContext } from "@/app/context/login";
import { useContext, useState } from "react";

function useLogin() {
  const [loginErrorMessage, setLoginErrorMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isUserLogged = useContext(LoginContext);

  return {
    email,
    password,
    loginErrorMessage,
    setEmail,
    setPassword,
    setLoginErrorMessage,
    isUserLogged,
  };
}

export default useLogin;
