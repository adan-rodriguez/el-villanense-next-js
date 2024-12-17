"use client";

import Button from "./Button";
import Form from "./Form";
import Input from "./Input";
import Label from "./Label";
import { useRouter } from "next/navigation";
import { login } from "@/app/lib/auth";

export default function LoginForm() {
  const router = useRouter();

  return (
    <>
      <Form
        style={{ maxWidth: "400px" }}
        onSubmit={async (e) => {
          const response = await login({ e });

          if (response.ok) {
            router.push("/dashboard");
          }
        }}
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
      {/* {loading && <p className={styles.loading}>Autenticando...</p>}
      {loginErrorMessage && (
        <p className={styles.error_message} role="alert">
          {loginErrorMessage}
        </p>
      )} */}
    </>
  );
}
