"use client";

import { signup } from "@/app/lib/server-actions";
import useSignup from "@/app/hooks/useSignup";
import styles from "../styles/SignupForm.module.css";
import Asterisk from "./Asterisk";
import Form from "./Form";
import Input from "./Input";
import Label from "./Label";
import { SubmitButton } from "./SubmitButton";

export default function SignupForm() {
  const { signupErrorMessage, getSignupErrorMessage } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();
    getSignupErrorMessage("");
    const formData = new FormData(e.target);
    const { errorMessage } = await signup(formData);
    console.log({ errorMessage });
    if (!errorMessage) {
      alert("Usuario creado con exito");
      return;
    }
    getSignupErrorMessage(errorMessage);
  }

  return (
    <>
      <Form style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
        <Label label="Nombre completo">
          <Asterisk />
          <Input type="text" id="name" name="name" required={true} />
        </Label>
        <Label label="Email">
          <Asterisk />
          <Input type="email" id="email" name="email" required={true} />
        </Label>
        <Label label="Contraseña">
          <Asterisk />
          Mínimo: 6 caracteres
          <Input
            type="password"
            id="password"
            name="password"
            required={true}
            minLength="6"
          />
        </Label>
        <Label label="Teléfono">
          <Input
            type="tel"
            id="phone"
            name="phone"
            minLength="6"
            placeholder="+543482524950"
          />
        </Label>
        {/* formato E.164: 
        Incluye el símbolo +. 
        Añade el código de país (Argentina:
        54). 
        Asegúrate de que el resto del número no tenga prefijos adicionales
        ni caracteres. */}
        <Label label="Link de una foto">
          <Input type="url" id="photo" name="photo" />
        </Label>
        <SubmitButton label="Crear usuario" />
      </Form>
      {signupErrorMessage && (
        <p className={styles.error_message} role="alert">
          {signupErrorMessage}
        </p>
      )}
    </>
  );
}
