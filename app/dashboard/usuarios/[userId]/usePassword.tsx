import { useErrorMessage } from "@/app/hooks/useErrorMessage";
import { useLoading } from "@/app/hooks/useLoading";
import { useLogout } from "@/app/hooks/useLogout";
import { auth } from "@/app/lib/firebase/client";
import { updatePassword } from "@/app/lib/server-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export function usePassword() {
  const [password, setPassword] = useState<string>();
  const [repeatedPassword, setRepeatedPassword] = useState<string>();
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();
  const { logout } = useLogout();
  const router = useRouter();

  const getPassword = (password?: string) => setPassword(password);
  const getRepeatedPassword = (repeatedPassword?: string) =>
    setRepeatedPassword(repeatedPassword);

  async function handleUpdatePassword(id: string) {
    getLoading(true);
    getErrorMessage(null);

    const { data, error, success } = z
      .object({
        password: z
          .string()
          .min(6, "La contraseña debe tener como mínimo seis caracteres"),

        repeatedPassword: z
          .string()
          .min(6, "La contraseña debe tener como mínimo seis caracteres"),
      })
      .refine((data) => data.password === data.repeatedPassword, {
        message: "Las contraseñas no coinciden",
        path: ["repeatedPassword"], // Path del campo con error
      })
      .safeParse({ password, repeatedPassword });

    if (!success) {
      getErrorMessage(error.errors[0].message);
      getLoading(false);
      return;
    }

    const {
      error: { message },
    } = await updatePassword({
      id,
      password: data.password,
      repeatedPassword: data.repeatedPassword,
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
    password,
    getPassword,
    repeatedPassword,
    getRepeatedPassword,
    loading,
    errorMessage,
    handleUpdatePassword,
  };
}
