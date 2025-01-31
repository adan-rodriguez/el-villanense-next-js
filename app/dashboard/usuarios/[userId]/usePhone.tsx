import { useErrorMessage } from "@/app/hooks/useErrorMessage";
import { useLoading } from "@/app/hooks/useLoading";
import { deletePhone, updatePhone } from "@/app/lib/server-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export function usePhone() {
  const [phone, setPhone] = useState<string>();
  const { loading: loadingUpdatePhone, getLoading: getLoadingUpdatePhone } =
    useLoading();
  const { loading: loadingDeletePhone, getLoading: getLoadingDeletePhone } =
    useLoading();
  const {
    errorMessage: updatePhoneErrorMessage,
    getErrorMessage: getUpdatePhoneErrorMessage,
  } = useErrorMessage();
  const {
    errorMessage: deletePhoneErrorMessage,
    getErrorMessage: getDeletePhoneErrorMessage,
  } = useErrorMessage();
  const router = useRouter();

  const getPhone = (phone?: string) => setPhone(phone);

  async function handleUpdatePhone(id: string) {
    getLoadingUpdatePhone(true);
    getUpdatePhoneErrorMessage(null);

    const { data, error, success } = z
      .string()
      .trim()
      .regex(
        /^\+[1-9]\d{1,14}$/,
        "Ingresa un número de teléfono válido en formato E.164. Por ejemplo: +541184267591"
      )
      .safeParse(phone);

    if (!success) {
      getUpdatePhoneErrorMessage(error.errors[0].message);
      getLoadingUpdatePhone(false);
      return;
    }

    const {
      error: { message },
    } = await updatePhone({
      id,
      phone: data,
    });

    if (!message) {
      alert("Teléfono actualizado con éxito");
      getLoadingUpdatePhone(false);
      getUpdatePhoneErrorMessage(null);
      router.refresh();
    }

    getLoadingUpdatePhone(false);
    getUpdatePhoneErrorMessage(message);
  }

  async function handleDeletePhone(id: string) {
    getLoadingDeletePhone(true);
    getDeletePhoneErrorMessage(null);

    const {
      error: { message },
    } = await deletePhone({
      id,
    });

    if (!message) {
      alert("Teléfono eliminado con éxito");
      getLoadingDeletePhone(false);
      getDeletePhoneErrorMessage(null);
      router.refresh();
    }

    getLoadingDeletePhone(false);
    getDeletePhoneErrorMessage(message);
  }

  return {
    phone,
    getPhone,
    loadingUpdatePhone,
    loadingDeletePhone,
    updatePhoneErrorMessage,
    deletePhoneErrorMessage,
    handleUpdatePhone,
    handleDeletePhone,
  };
}
