import { useRouter } from "next/navigation";
import { useLoading } from "./useLoading";
import { useErrorMessage } from "./useErrorMessage";
import { updateUser } from "../lib/server-actions";
import { useLogout } from "./useLogout";

export function useUpdateUser() {
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();
  const { logout } = useLogout();
  const router = useRouter();

  async function update({
    e,
    id,
  }: {
    e: React.FormEvent<HTMLFormElement>;
    id: string;
  }) {
    e.preventDefault();

    getLoading(true);
    getErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const {
      error: { message },
    } = await updateUser({
      id,
      formData,
    });

    if (!message) {
      alert("Usuario actualizado con exito");
      getLoading(false);
      getErrorMessage(null);
      router.refresh();
      return;
    }

    if (
      message === "La cookie de sesión ha sido revocada" ||
      message === "Error al verificar la sesión"
    ) {
      alert("Usuario actualizado con exito");
      logout();
      return;
    }

    getLoading(false);
    getErrorMessage(message);
  }

  return {
    loading,
    errorMessage,
    update,
  };
}
