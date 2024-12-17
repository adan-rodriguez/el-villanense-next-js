import { useRouter } from "next/navigation";
import { useState } from "react";

export function useUpdateUser() {
  const [updateUserErrorMessage, setUpdateUserErrorMessage] = useState("");
  const router = useRouter();

  const getUpdateUserErrorMessage = (errorMessage) =>
    setUpdateUserErrorMessage(errorMessage);

  return {
    updateUserErrorMessage,
    getUpdateUserErrorMessage,
    router,
  };
}
