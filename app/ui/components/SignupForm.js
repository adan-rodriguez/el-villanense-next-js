"use client";

import { signup } from "../../lib/auth";
import styles from "../styles/SignupForm.module.css";
import Asterisk from "./Asterisk";
import Button from "./Button";
import Form from "./Form";
import Input from "./Input";
import Label from "./Label";

export default function SignupForm({
  signupErrorMessage,
  getSignupErrorMessage,
  loading,
  getLoading,
}) {
  return (
    <>
      <Form
        style={{ maxWidth: "400px" }}
        onSubmit={(e) => signup({ e, getSignupErrorMessage, getLoading })}
      >
        <Label label="Email">
          <Asterisk />
          <Input type="email" id="email" required={true} />
        </Label>
        <Label label="Contraseña">
          <Asterisk />
          <Input type="password" id="password" required={true} minLength="6" />
        </Label>
        <Button
          type="submit"
          label="Crear usuario"
          style={{ alignSelf: "center" }}
        />
      </Form>
      {loading && <p className={styles.registering}>Registrando...</p>}
      {signupErrorMessage && (
        <p className={styles.error_message} role="alert">
          {signupErrorMessage}
        </p>
      )}
    </>
  );
}
