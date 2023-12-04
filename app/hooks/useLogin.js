import { AuthContext } from "@/app/context/auth";
import { useContext, useState } from "react";

export default function useLogin() {
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(AuthContext);

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
