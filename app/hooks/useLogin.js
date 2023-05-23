import { LoginContext } from "@/app/context/login";
import { useContext, useState } from "react";

export default function useLogin() {
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useContext(LoginContext);

  return {
    email,
    password,
    loginErrorMessage,
    setEmail,
    setPassword,
    setLoginErrorMessage,
    user,
  };
}
