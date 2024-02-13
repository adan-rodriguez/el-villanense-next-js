import styles from "@/app/ui/styles/Form.module.css";

export default function Form({ children, ...props }) {
  return (
    <form {...props} className={styles.form}>
      {children}
    </form>
  );
}
