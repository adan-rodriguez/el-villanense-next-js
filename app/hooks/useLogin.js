import { useState } from "react";

export default function useLogin() {
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLoginErrorMessage = (errorMessage) =>
    setLoginErrorMessage(errorMessage);

  const getLoading = (bool) => setLoading(bool);

  return {
    loginErrorMessage,
    getLoginErrorMessage,
    loading,
    getLoading,
  };
}
