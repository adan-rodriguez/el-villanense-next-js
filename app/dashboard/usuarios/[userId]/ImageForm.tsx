import { Button } from "@/app/ui/components/Button";
import { InputImage } from "@/app/ui/components/InputImage";
import { useImage } from "./useImage";
import { ConfirmModal } from "@/app/ui/components/ConfirmModal";
import { useRef } from "react";

export function ImageForm({
  id,
  initialImage,
}: {
  id: string;
  initialImage?: string;
}) {
  const {
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
  } = useImage();

  const deleteImageModalRef = useRef<HTMLDialogElement>(null);

  return (
    <fieldset
      style={{
        padding: "revert",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <legend
        style={{
          padding: "revert",
        }}
      >
        <small>Imagen</small>
      </legend>
      {!initialImage || changeImage ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleUpdateImage(id);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <InputImage
            imageFile={imageFile}
            getImageFile={getImageFile}
            required={true}
          />
          {updateImageErrorMessage && <p>{updateImageErrorMessage}</p>}
          <Button
            type="submit"
            label="Actualizar imagen"
            disabled={loadingUpdateImage}
          />
        </form>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <img
            src={initialImage}
            alt="Imagen de perfil del usuario"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
          <Button
            type="button"
            label="Cambiar imagen"
            style={{ alignSelf: "stretch" }}
            onClick={() => getChangeImage(true)}
          />
          <Button
            type="button"
            label="Eliminar imagen"
            style={{ alignSelf: "stretch" }}
            onClick={() => deleteImageModalRef.current?.showModal()}
            disabled={loadingDeleteImage}
          />
          <ConfirmModal
            ref={deleteImageModalRef}
            text="¿Estás seguro deseas eliminar la imagen del usuario?"
            onClose={async (e) => {
              if (e.currentTarget.returnValue === "cancel") return;
              await handleDeleteImage(id);
            }}
          />
          {deleteImageErrorMessage && <p>{deleteImageErrorMessage}</p>}
        </div>
      )}
    </fieldset>
  );
}
