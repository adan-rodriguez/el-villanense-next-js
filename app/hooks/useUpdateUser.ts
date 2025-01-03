import { useRouter } from "next/navigation";
import { useLoading } from "./useLoading";
import { useErrorMessage } from "./useErrorMessage";

export function useUpdateUser() {
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();
  const router = useRouter();

  return {
    loading,
    getLoading,
    errorMessage,
    getErrorMessage,
    router,
  };
}
