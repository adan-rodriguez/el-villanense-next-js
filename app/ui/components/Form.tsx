import styles from "@/app/ui/styles/Form.module.css";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export function Form({ children, ...props }: FormProps) {
  return (
    <form {...props} className={styles.form}>
      {children}
    </form>
  );
}
