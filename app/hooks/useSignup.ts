import { signup } from "../lib/server-actions";
import { useErrorMessage } from "./useErrorMessage";
import { useLoading } from "./useLoading";

export function useSignup() {
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();

  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    getLoading(true);
    getErrorMessage(null);

    const $form = e.currentTarget;

    const formData = new FormData($form);
    const {
      error: { message },
    } = await signup(formData);
    if (!message) {
      alert("Usuario creado con exito");
      getLoading(false);
      $form.reset();
      return;
    }

    getLoading(false);
    getErrorMessage(message);
  }

  return {
    errorMessage,
    loading,
    register,
  };
}
