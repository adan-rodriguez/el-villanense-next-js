import styles from "@/app/ui/styles/Input.module.css";

export default function Input({ id, type = "text", ...props }) {
  return <input id={id} type={type} {...props} className={styles.input} />;
}
