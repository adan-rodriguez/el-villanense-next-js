import { useErrorMessage } from "@/app/hooks/useErrorMessage";
import { useLoading } from "@/app/hooks/useLoading";
import { updateName } from "@/app/lib/server-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export function useName() {
  const [name, setName] = useState<string>();
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();
  const router = useRouter();

  const getName = (name?: string) => setName(name);

  async function handleUpdateName(id: string) {
    getLoading(true);
    getErrorMessage(null);

    const { data, error, success } = z
      .object({
        name: z
          .string()
          .trim()
          .nonempty("Introduce tu nombre")
          .max(150, "Introduce un nombre más corto"),
      })
      .safeParse({
        name,
      });

    if (!success) {
      getErrorMessage(error.errors[0].message);
      getLoading(false);
      return;
    }

    const {
      error: { message: errorMessage },
    } = await updateName({
      id,
      name: data.name,
    });

    if (!errorMessage) {
      alert("Nombre del usuario actualizado con éxito");
      getLoading(false);
      getErrorMessage(null);
      router.refresh();
    }

    getLoading(false);
    getErrorMessage(errorMessage);
  }

  return {
    name,
    getName,
    loading,
    errorMessage,
    handleUpdateName,
  };
}
