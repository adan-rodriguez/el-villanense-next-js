import styles from "@/app/ui/styles/Asterisk.module.css";

export default function Asterisk() {
  return (
    <abbr
      title="Este campo es obligatorio"
      aria-label="required"
      className={styles.asterisk}
    >
      *
    </abbr>
  );
}
