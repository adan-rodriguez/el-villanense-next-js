import { handleFileChange } from "@/app/lib/utils";
import Asterisk from "./Asterisk";
import styles from "@/app/ui/styles/SelectImage.module.css";

export default function SelectImage({ getImageFile }) {
  return (
    <label className="btn" style={{ alignSelf: "flex-start" }}>
      Seleccionar imagen
      <Asterisk />
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .svg, .webp"
        onChange={(e) =>
          handleFileChange({ file: e.target.files[0], getImageFile })
        }
        className={styles.input}
      />
    </label>
  );
}
