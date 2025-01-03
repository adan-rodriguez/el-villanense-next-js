import styles from "@/app/ui/styles/Input.module.css";

export function Input({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={styles.input} />;
}
