"use client";

import { signup } from "@/app/lib/server-actions";
import { useSignup } from "@/app/hooks/useSignup";
import styles from "../styles/SignupForm.module.css";
import { Form } from "./Form";
import { Input } from "./Input";
import { Label } from "./Label";
import { Button } from "./Button";

export function SignupForm() {
  const { loading, getLoading, errorMessage, getErrorMessage } = useSignup();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    getLoading(true);
    getErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const { error: signupErrorMessage } = await signup(formData);
    if (!signupErrorMessage) {
      alert("Usuario creado con exito");
      getLoading(false);
      return;
    }

    getLoading(false);
    getErrorMessage(signupErrorMessage);
  }

  return (
    <>
      <Form style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
        <Label label="Nombre completo">
          <Input id="name" name="name" required={true} />
        </Label>
        <Label label="Email">
          <Input type="email" id="email" name="email" required={true} />
        </Label>
        <Label label="Contraseña">
          Mínimo: 6 caracteres
          <Input
            type="password"
            id="password"
            name="password"
            required={true}
            minLength={6}
          />
        </Label>
        <Label label="Teléfono" required={false}>
          <Input
            type="tel"
            id="phone"
            name="phone"
            minLength={6}
            placeholder="+543482524950"
          />
        </Label>
        {/* formato E.164: 
        Incluye el símbolo +. 
        Añade el código de país (Argentina:
        54). 
        Asegúrate de que el resto del número no tenga prefijos adicionales
        ni caracteres. */}
        <Label label="Link de una foto" required={false}>
          <Input type="url" id="photo" name="photo" />
        </Label>
        <Button type="submit" label="Crear usuario" disabled={loading} />
      </Form>
      {errorMessage && (
        <p className={styles.error_message} role="alert">
          {errorMessage}
        </p>
      )}
    </>
  );
}
