import Asterisk from "./Asterisk";
import styles from "@/app/ui/styles/SelectImage.module.css";

export default function SelectImage({ onChange }) {
  return (
    <label className="btn" style={{ alignSelf: "flex-start" }}>
      Seleccionar imagen
      <Asterisk />
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .svg, .webp"
        onChange={onChange}
        className={styles.input}
      />
    </label>
  );
}
