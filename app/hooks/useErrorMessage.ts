import { useState } from "react";

export function useErrorMessage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getErrorMessage = (errorMessage: string | null) =>
    setErrorMessage(errorMessage);

  return {
    errorMessage,
    getErrorMessage,
  };
}
