"use client";

import { useLogin } from "@/app/hooks/useLogin";
import { Button } from "./Button";
import { Form } from "./Form";
import { Input } from "./Input";
import { Label } from "./Label";
import { auth } from "@/app/lib/firebase/client";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "@/app/ui/styles/LoginForm.module.css";

export function LoginForm() {
  const { errorMessage, loading, login } = useLogin();

  return (
    <>
      <Form style={{ maxWidth: "400px" }} onSubmit={login}>
        <Label label="Email" required={false}>
          <Input type="email" id="email" name="email" required={true} />
        </Label>
        <Label label="Contraseña" required={false}>
          <Input
            type="password"
            id="password"
            name="password"
            required={true}
          />
        </Label>
        <Button type="submit" label="Ingresar" disabled={loading} />
      </Form>
      {errorMessage && (
        <p className={styles.error_message} role="alert">
          {errorMessage}
        </p>
      )}
    </>
  );
}
