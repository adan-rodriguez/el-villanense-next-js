import { AuthContext } from "@/app/context/auth";
import { useContext, useState } from "react";

export default function useAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const { user } = useContext(AuthContext);

  const getEmail = (em) => setEmail(em);
  const getPassword = (pass) => setPassword(pass);
  const getLoginErrorMessage = (errorMessage) =>
    setLoginErrorMessage(errorMessage);

  return {
    email,
    password,
    loginErrorMessage,
    getEmail,
    getPassword,
    getLoginErrorMessage,
    user,
  };
}
