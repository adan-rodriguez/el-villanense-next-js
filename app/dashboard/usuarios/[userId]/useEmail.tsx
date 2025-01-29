import { useErrorMessage } from "@/app/hooks/useErrorMessage";
import { useLoading } from "@/app/hooks/useLoading";
import { useLogout } from "@/app/hooks/useLogout";
import { auth } from "@/app/lib/firebase/client";
import { updateEmail } from "@/app/lib/server-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export function useEmail() {
  const [email, setEmail] = useState<string>();
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();
  const { logout } = useLogout();
  const router = useRouter();

  const getEmail = (email?: string) => setEmail(email);

  async function handleUpdateEmail(id: string) {
    getLoading(true);
    getErrorMessage(null);

    const { data, error, success } = z
      .string()
      .trim()
      .email("Ingrese un email válido")
      .safeParse(email);

    if (!success) {
      getErrorMessage(error.errors[0].message);
      getLoading(false);
      return;
    }

    const {
      error: { message },
    } = await updateEmail({
      id,
      email: data,
    });

    if (!message) {
      alert("Usuario actualizado con exito");
      getLoading(false);
      getErrorMessage(null);
      if (auth.currentUser?.uid === id) {
        await logout();
      } else {
        router.refresh();
      }
      return;
    }

    getLoading(false);
    getErrorMessage(message);
  }

  return {
    email,
    getEmail,
    loading,
    errorMessage,
    handleUpdateEmail,
  };
}
