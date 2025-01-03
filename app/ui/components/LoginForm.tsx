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
  const { errorMessage, getErrorMessage, loading, getLoading, router } =
    useLogin();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    getErrorMessage(null);
    getLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      alert("Falta email o contraseña!");
      return;
    }

    await setPersistence(auth, browserSessionPersistence);

    let userCredential;
    try {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const { code } = error;
      if (code === "auth/invalid-email" || code === "auth/wrong-password") {
        getErrorMessage("Email o contraseña incorrectos");
      } else {
        getErrorMessage("Ocurrió un error, intenta de nuevo más tarde");
      }

      getLoading(false);
      return;
    }

    console.log({ userCredential });

    const idToken = await userCredential.user.getIdToken();
    console.log({ idToken });

    // const response = await fetch("/api/auth/login", {
    //   headers: {
    //     Authorization: `Bearer ${idToken}`,
    //   },
    // });

    // if (!response.ok) {
    //   getErrorMessage("Ocurrió un error, intenta de nuevo más tarde");
    //   getLoading(false);
    //   return;
    // }

    // getErrorMessage(null);
    // getLoading(false);
    // router.push("/dashboard");
  }

  return (
    <>
      <Form style={{ maxWidth: "400px" }} onSubmit={login}>
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
          disabled={loading}
        />
      </Form>
      {errorMessage && (
        <p className={styles.error_message} role="alert">
          {errorMessage}
        </p>
      )}
    </>
  );
}
