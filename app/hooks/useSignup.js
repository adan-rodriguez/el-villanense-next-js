import { useState } from "react";

export default function useSignup() {
  const [signupErrorMessage, setSignupErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSignupErrorMessage = (errorMessage) =>
    setSignupErrorMessage(errorMessage);

  const getLoading = (bool) => setLoading(bool);

  return {
    signupErrorMessage,
    getSignupErrorMessage,
    loading,
    getLoading,
  };
}
