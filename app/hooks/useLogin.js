import { useState } from "react";

export default function useLogin() {
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);

  const getLoginErrorMessage = (errorMessage) =>
    setLoginErrorMessage(errorMessage);

  return {
    loginErrorMessage,
    getLoginErrorMessage,
  };
}
