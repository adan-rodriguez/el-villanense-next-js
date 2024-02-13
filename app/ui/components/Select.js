import styles from "@/app/ui/styles/Select.module.css";

export default function Select({ id, children, ...props }) {
  return (
    <select id={id} {...props} className={styles.select}>
      {children}
    </select>
  );
}
