"use client";

import { login } from "../../lib/auth";
import styles from "../styles/LoginForm.module.css";
import Button from "./Button";
import Form from "./Form";
import Input from "./Input";
import Label from "./Label";

export default function LoginForm({
  loginErrorMessage,
  getLoginErrorMessage,
  loading,
  getLoading,
}) {
  return (
    <>
      <Form
        style={{ maxWidth: "400px" }}
        onSubmit={(e) => login({ e, getLoginErrorMessage, getLoading })}
      >
        <Label label="Email">
          <Input type="email" id="email" name="email" required={true} />
        </Label>
        <Label label="Contraseña">
          <Input
            type="password"
            id="password"
            name="password"
            required={true}
          />
        </Label>
        <Button
          type="submit"
          label="Ingresar"
          style={{ alignSelf: "center" }}
        />
      </Form>
      {loading && <p className={styles.loading}>Autenticando...</p>}
      {loginErrorMessage && (
        <p className={styles.error_message} role="alert">
          {loginErrorMessage}
        </p>
      )}
    </>
  );
}
