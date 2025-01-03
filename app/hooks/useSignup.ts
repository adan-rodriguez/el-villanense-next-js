import { useErrorMessage } from "./useErrorMessage";
import { useLoading } from "./useLoading";

export function useSignup() {
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();

  return {
    errorMessage,
    getErrorMessage,
    loading,
    getLoading,
  };
}
