"use client";

import useSignup from "@/app/hooks/useSignup";
import { signup } from "../../lib/auth";
import styles from "../styles/SignupForm.module.css";

export default function SignupForm() {
  const { signupErrorMessage, getSignupErrorMessage } = useSignup();

  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => signup(e, { getSignupErrorMessage })}
      >
        <label className={styles.form_label} htmlFor="email">
          Email
          <input
            className={styles.form_input}
            type="text"
            id="email"
            required
          />
        </label>
        <label className={styles.form_label} htmlFor="password">
          Contraseña
          <input
            className={styles.form_input}
            type="password"
            id="password"
            required
          />
        </label>
        <button className={styles.form_btn} type="submit">
          Crear usuario
        </button>
      </form>
      {signupErrorMessage && (
        <p className={styles.form_signup_error_message} role="alert">
          {signupErrorMessage}
        </p>
      )}
    </>
  );
}
