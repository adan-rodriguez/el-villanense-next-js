"use client";

import { login } from "../../lib/auth";
import styles from "../styles/LoginForm.module.css";

export default function LoginForm({
  loginErrorMessage,
  getLoginErrorMessage,
  loading,
  getLoading,
}) {
  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => login({ e, getLoginErrorMessage, getLoading })}
      >
        <label className={styles.label}>
          Email
          <input className={styles.input} type="text" id="email" required />
        </label>
        <label className={styles.label}>
          Contraseña
          <input
            className={styles.input}
            type="password"
            id="password"
            required
          />
        </label>
        <button className={styles.btn} type="submit">
          Ingresar
        </button>
      </form>
      {loading && <p className={styles.loading}>Autenticando...</p>}
      {loginErrorMessage && (
        <p className={styles.error_message} role="alert">
          {loginErrorMessage}
        </p>
      )}
    </>
  );
}
