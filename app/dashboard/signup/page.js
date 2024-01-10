import SignupForm from "@/app/ui/components/SignupForm";
import styles from "@/app/ui/styles/SignupPage.module.css";

export default function SignupPage() {
  return (
    <>
      <h2 className={styles.title}>Crear usuario</h2>
      <SignupForm />
    </>
  );
}
