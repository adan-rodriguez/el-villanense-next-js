import { useErrorMessage } from "@/app/hooks/useErrorMessage";
import { useLoading } from "@/app/hooks/useLoading";
import { updateRole } from "@/app/lib/server-actions";
import { Role } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export function useRole() {
  const [role, setRole] = useState<Role>();
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();
  const router = useRouter();

  const getRole = (role?: Role) => setRole(role);

  async function handleUpdateRole(id: string) {
    getLoading(true);
    getErrorMessage(null);

    const { data, error, success } = z
      .enum(["editor", "superadmin"])
      .safeParse(role);

    if (!success) {
      getErrorMessage(error.errors[0].message);
      getLoading(false);
      return;
    }

    const {
      error: { message },
    } = await updateRole({
      id,
      role: data,
    });

    if (!message) {
      alert("Rol del usuario actualizado con éxito");
      getLoading(false);
      getErrorMessage(null);
      router.refresh();
    }

    getLoading(false);
    getErrorMessage(message);
  }

  return {
    role,
    getRole,
    loading,
    errorMessage,
    handleUpdateRole,
  };
}
