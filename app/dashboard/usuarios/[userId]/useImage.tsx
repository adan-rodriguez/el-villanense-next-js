import { useErrorMessage } from "@/app/hooks/useErrorMessage";
import { useLoading } from "@/app/hooks/useLoading";
import { auth } from "@/app/lib/firebase/client";
import { deleteImage, updateImage } from "@/app/lib/server-actions";
import { allowedImageFileTypes } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useImage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const { loading: loadingUpdateImage, getLoading: getLoadingUpdateImage } =
    useLoading();
  const { loading: loadingDeleteImage, getLoading: getLoadingDeleteImage } =
    useLoading();
  const {
    errorMessage: updateImageErrorMessage,
    getErrorMessage: getUpdateImageErrorMessage,
  } = useErrorMessage();
  const {
    errorMessage: deleteImageErrorMessage,
    getErrorMessage: getDeleteImageErrorMessage,
  } = useErrorMessage();
  const router = useRouter();

  const getImageFile = (imageFile: File | null) => setImageFile(imageFile);
  const getChangeImage = (bool: boolean) => setChangeImage(bool);

  async function handleUpdateImage(id: string) {
    getLoadingUpdateImage(true);
    getUpdateImageErrorMessage(null);

    if (!(imageFile instanceof File)) {
      getLoadingUpdateImage(false);
      getUpdateImageErrorMessage(
        "Ocurrió un error. Intenta nuevamente más tarde."
      );
      return;
    }

    const { type } = imageFile;

    if (!allowedImageFileTypes.includes(type)) {
      getLoadingUpdateImage(false);
      getUpdateImageErrorMessage(
        `No se acepta una imagen con formato '${type}'`
      );
      return;
    }

    const {
      error: { message },
    } = await updateImage({
      id,
      imageFile,
    });

    if (!message) {
      alert("Imagen actualizada con éxito");
      getLoadingUpdateImage(false);
      getUpdateImageErrorMessage(null);
      await auth.currentUser?.reload();
      router.refresh();
    }

    getLoadingUpdateImage(false);
    getUpdateImageErrorMessage(message);
  }

  async function handleDeleteImage(id: string) {
    getLoadingDeleteImage(true);
    getDeleteImageErrorMessage(null);

    const {
      error: { message },
    } = await deleteImage({
      id,
    });

    if (!message) {
      alert("Imagen eliminada con éxito");
      getLoadingDeleteImage(false);
      getDeleteImageErrorMessage(null);
      router.refresh();
    }

    getLoadingDeleteImage(false);
    getDeleteImageErrorMessage(message);
  }

  return {
    imageFile,
    getImageFile,
    changeImage,
    getChangeImage,
    handleUpdateImage,
    handleDeleteImage,
    loadingUpdateImage,
    loadingDeleteImage,
    updateImageErrorMessage,
    deleteImageErrorMessage,
  };
}
