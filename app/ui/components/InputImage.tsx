import { allowedImageFileTypes } from "@/app/lib/utils";
import { CameraPlus, TrashIcon } from "@/app/ui/components/Icons";
import styles from "@/app/ui/styles/InputImage.module.css";

const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  e.currentTarget.classList.add(styles.dragging);
};

const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
  e.currentTarget.classList.remove(styles.dragging);
};

const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  e.currentTarget.classList.remove(styles.dragging);
  const file = e.dataTransfer.files[0];

  if (!file) return;

  const { type } = file;

  if (!allowedImageFileTypes.includes(type)) {
    alert(`No se acepta un archivo con formato '${type}'`);
    return;
  }

  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);

  const imageFileInput = document.getElementById("image-file-input");

  if (imageFileInput instanceof HTMLInputElement) {
    imageFileInput.files = dataTransfer.files;

    const event = new Event("change", { bubbles: true });
    imageFileInput.dispatchEvent(event);
  } else {
    alert(
      imageFileInput
        ? "'image-file-input' no es un HTMLInputElement. Verifica el código."
        : "'image-file-input' no existe en el DOM. Verifica el código."
    );
  }
};

const getInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  const $input = e.currentTarget;
  const file = $input.files && $input.files[0];

  if (!file) return null;

  const { type } = file;

  if (!allowedImageFileTypes.includes(type)) {
    alert(`No se acepta un archivo con formato '${type}'`);
    $input.value = "";
    return null;
  }

  return file;
};

export function InputImage({
  imageFile,
  getImageFile,
  required,
}: {
  imageFile: File | null;
  getImageFile: (file: File | null) => void;
  required?: boolean;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = getInputImage(e);
    getImageFile(file);
  };

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={styles.label}
      title="Seleccionar imagen"
      style={{
        backgroundImage: imageFile
          ? `url(${URL.createObjectURL(imageFile)})`
          : "linear-gradient(45deg,rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://res.cloudinary.com/dh4eh6jen/image/upload/v1703888334/el-villanense-redactores/person-icon_itua0j.webp')",
      }}
    >
      <input
        id="image-file-input"
        type="file"
        accept="image/png, image/jpeg, image/webp, image/svg+xml, image/avif"
        required={required}
        style={{ opacity: "0", position: "absolute", pointerEvents: "none" }}
        onChange={handleChange}
      />
      {!imageFile && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            fontSize: "8px",
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          <span>Sube o arrastra una imagen...</span>
          <CameraPlus />
        </div>
      )}
      {imageFile && (
        <button
          type="button"
          title="Quitar imagen"
          onClick={(e) => {
            e.preventDefault();
            const $input = document.getElementById("image-file-input");
            if (!($input instanceof HTMLInputElement)) {
              alert(
                $input
                  ? "'image-file-input' no es un HTMLInputElement. Verifica el código."
                  : "'image-file-input' no existe en el DOM. Verifica el código."
              );
              return;
            }
            $input.value = "";
            const event = new Event("change", { bubbles: true });
            $input.dispatchEvent(event);
          }}
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            right: "0",
            width: "24px",
            height: "24px",
          }}
        >
          <TrashIcon width={16} height={16} />
        </button>
      )}
    </label>
  );
}
