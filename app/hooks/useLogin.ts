import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLoading } from "./useLoading";
import { useErrorMessage } from "./useErrorMessage";

export function useLogin() {
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();

  const router = useRouter();

  return {
    errorMessage,
    getErrorMessage,
    loading,
    getLoading,
    router,
  };
}
