"use client";

import { allowedImageFileTypes } from "@/app/lib/utils";
import { Asterisk } from "./Asterisk";
import styles from "@/app/ui/styles/SelectImage.module.css";

const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.currentTarget.classList.add(styles.drag);
};

const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  e.currentTarget.classList.remove(styles.drag);
};

export function SelectImage({
  imageFile,
  getImageFile,
}: {
  imageFile: File | null;
  getImageFile: (imageFile: File | null) => void;
}) {
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const $input = e.currentTarget;
    const file = $input.files && $input.files[0]; // A FileList object listing the selected files, if any, or null if the HTMLInputElement is not of type="file".

    // if (!file) return getImageFile(null);
    if (!file) return;

    const { type } = file;

    if (!allowedImageFileTypes.includes(type)) {
      alert(`No se acepta un archivo con formato '${type}'`);
      $input.value = "";
      return;
    }

    getImageFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (!file) return;

    const { type } = file;

    if (!allowedImageFileTypes.includes(type)) {
      alert(`No se acepta un archivo con formato '${type}'`);
      return;
    }

    getImageFile(file);
    e.currentTarget.classList.remove(styles.drag);

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    const imageFileInput = document.getElementById("image-file-input");

    if (!imageFileInput)
      return alert(
        "'document.getElementById('image-file-input')' devolvió null. REVISA EL CÓDIGO!!!"
      );

    if (imageFileInput instanceof HTMLInputElement) {
      imageFileInput.files = dataTransfer.files;
    } else {
      alert(
        "'document.getElementById('image-file-input')' no devolvió un HTMLInputElement. REVISA EL CÓDIGO!!!"
      );
    }
  };

  return (
    <>
      <label className="btn" style={{ alignSelf: "flex-start" }}>
        Seleccionar imagen
        <Asterisk />
        <input
          id="image-file-input"
          type="file"
          accept=".jpg, .jpeg, .png, .svg, .webp, .avif"
          onChange={handleImageFileChange}
          className={styles.input}
          required
        />
      </label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={styles.dropzone}
      >
        <div
          style={{
            backgroundImage: imageFile
              ? `url(${URL.createObjectURL(imageFile)})`
              : "",
          }}
          className={styles.image_preview}
        >
          {!imageFile && (
            <>
              <p>O arrastra la imagen aquí </p>
              <svg width="24" height="24">
                <path
                  d="M19 7v3h-2V7h-3V5h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12a2 2 0 002-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"
                  fill="gray"
                ></path>
              </svg>
            </>
          )}
        </div>
      </div>
    </>
  );
}
