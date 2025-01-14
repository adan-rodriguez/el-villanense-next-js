"use client";

import { useSignup } from "@/app/hooks/useSignup";
import styles from "@/app/ui/styles/SignupForm.module.css";
import { Form } from "../../ui/components/Form";
import { Input } from "../../ui/components/Input";
import { Label } from "../../ui/components/Label";
import { Button } from "../../ui/components/Button";

export function SignupForm() {
  const { loading, errorMessage, register } = useSignup();

  return (
    <>
      <Form style={{ maxWidth: "400px" }} onSubmit={register}>
        <Label label="Nombre completo" required={true}>
          <Input id="name" name="name" required={true} />
        </Label>
        <Label label="Nombre de usuario" required={true}>
          <Input id="nick" name="nick" required={true} />
        </Label>
        <Label label="Email" required={true}>
          <Input type="email" id="email" name="email" required={true} />
        </Label>
        <Label label="Contraseña" required={true}>
          <small>
            <em>Mínimo: 6 caracteres</em>
          </small>
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
        <Label label="Rol" required={true}>
          <div>
            <input
              type="radio"
              name="role"
              value="editor"
              defaultChecked
              style={{ marginRight: "0.25rem", verticalAlign: "middle" }}
              required
            />
            <small>Editor</small>
          </div>
          <div>
            <input
              type="radio"
              name="role"
              value="superadmin"
              style={{ marginRight: "0.25rem", verticalAlign: "middle" }}
            />
            <small>Superadministrador</small>
          </div>
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
