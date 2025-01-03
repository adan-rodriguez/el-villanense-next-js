import { Asterisk } from "./Asterisk";
import styles from "@/app/ui/styles/SelectImage.module.css";

export const handleFileChange = ({
  file,
  getImageFile,
}: {
  file: File | null;
  getImageFile: (imageFile: File | null) => void;
}) => {
  const allowedImageFileTypes = [
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ];

  // if (!file) return getImageFile(null);
  if (!file) return;

  const { type } = file;

  if (!allowedImageFileTypes.includes(type)) {
    alert(`No se acepta un archivo con formato '${type}'`);
    return;
  }

  getImageFile(file);
};

export function SelectImage({
  getImageFile,
}: {
  getImageFile: (imageFile: File | null) => void;
}) {
  return (
    <label className="btn" style={{ alignSelf: "flex-start" }}>
      Seleccionar imagen
      <Asterisk />
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .svg, .webp"
        onChange={(e) =>
          handleFileChange({
            file: e.target.files && e.target.files[0],
            getImageFile,
          })
        }
        className={styles.input}
      />
    </label>
  );
}
