import { redirect } from "next/navigation";
import { handleLogin } from "../../lib/auth";
import styles from "../styles/LoginForm.module.css";
import { routes } from "@/app/lib/routes";

export default function LoginForm({
  email,
  password,
  loginErrorMessage,
  getEmail,
  getPassword,
  getLoginErrorMessage,
}) {
  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          const errorMessage = handleLogin({ email, password });
          if (errorMessage) {
            getLoginErrorMessage(errorMessage);
          } else {
            redirect(routes.dashboard.root);
          }
        }}
      >
        <div>
          <label className={styles.form_label} htmlFor="email">
            Email
            <input
              className={styles.form_input}
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => getEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className={styles.form_label} htmlFor="password">
            Contraseña
            <input
              className={styles.form_input}
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => getPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className={styles.form_btn} type="submit">
          Ingresar
        </button>
      </form>
      {loginErrorMessage && (
        <p className={styles.form_login_error_message} role="alert">
          {loginErrorMessage}
        </p>
      )}
    </>
  );
}
