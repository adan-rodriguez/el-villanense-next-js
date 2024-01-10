import { useState } from "react";

export default function useSignup() {
  const [signupErrorMessage, setSignupErrorMessage] = useState(null);

  const getSignupErrorMessage = (errorMessage) =>
    setSignupErrorMessage(errorMessage);

  return {
    signupErrorMessage,
    getSignupErrorMessage,
  };
}
