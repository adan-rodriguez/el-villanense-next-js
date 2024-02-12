"use client";

import { signup } from "../../lib/auth";
import styles from "../styles/SignupForm.module.css";
import Asterisk from "./Asterisk";
import Button from "./Button";

export default function SignupForm({
  signupErrorMessage,
  getSignupErrorMessage,
  loading,
  getLoading,
}) {
  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => signup({ e, getSignupErrorMessage, getLoading })}
      >
        <label className={styles.label}>
          Email
          <Asterisk />
          <input className={styles.input} type="email" id="email" required />
        </label>
        <label className={styles.label}>
          Contraseña
          <Asterisk />
          <input
            className={styles.input}
            type="password"
            id="password"
            minLength="6"
            required
          />
        </label>
        <Button type="submit" label="Crear usuario" />
      </form>
      {loading && <p className={styles.registering}>Registrando...</p>}
      {signupErrorMessage && (
        <p className={styles.error_message} role="alert">
          {signupErrorMessage}
        </p>
      )}
    </>
  );
}
