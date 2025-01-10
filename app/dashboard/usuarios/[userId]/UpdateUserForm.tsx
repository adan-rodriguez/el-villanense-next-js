"use client";

import { useUpdateUser } from "@/app/hooks/useUpdateUser";
import { Role } from "@/app/lib/types";
import { Button } from "@/app/ui/components/Button";
import { Form } from "@/app/ui/components/Form";
import { Input } from "@/app/ui/components/Input";
import { Label } from "@/app/ui/components/Label";
import styles from "@/app/ui/styles/UpdateUserForm.module.css";

export function UpdateUserForm({
  id,
  name,
  email,
  phone,
  image,
  role,
}: {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  role?: Role;
}) {
  const { loading, errorMessage, update } = useUpdateUser();

  return (
    <>
      <Form style={{ maxWidth: "400px" }} onSubmit={(e) => update({ e, id })}>
        <Label label="Nombre completo" required={false}>
          <Input id="name" name="name" defaultValue={name} required={true} />
        </Label>
        <Label label="Email" required={false}>
          <Input
            type="email"
            id="email"
            name="email"
            defaultValue={email}
            required={true}
          />
        </Label>
        <Label label="Contraseña" required={false}>
          <Input
            type="password"
            id="password"
            name="password"
            minLength={6}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault(); // Bloquea la tecla espacio
              }
            }}
          />
        </Label>
        <Label label="Repetir contraseña" required={false}>
          <Input
            type="password"
            id="repeat-password"
            name="repeat-password"
            minLength={6}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault(); // Bloquea la tecla espacio
              }
            }}
          />
        </Label>
        <Label label="Teléfono" required={false}>
          <Input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+543482524950"
            defaultValue={phone}
          />
        </Label>
        {/* formato E.164: 
        Incluye el símbolo +. 
        Añade el código de país (Argentina:
        54). 
        Asegúrate de que el resto del número no tenga prefijos adicionales
        ni caracteres. */}
        <Label label="Link de una foto" required={false}>
          <Input type="url" id="photo" name="photo" defaultValue={image} />
        </Label>
        <Label label="Rol" required={false}>
          <div>
            <input
              type="radio"
              name="role"
              value="editor"
              defaultChecked={role === "editor" || !role}
              style={{ marginRight: "0.25rem", verticalAlign: "middle" }}
            />
            <small>Editor</small>
          </div>
          <div>
            <input
              type="radio"
              name="role"
              value="superadmin"
              defaultChecked={role === "superadmin"}
              style={{ marginRight: "0.25rem", verticalAlign: "middle" }}
            />
            <small>Superadministrador</small>
          </div>
        </Label>
        <Button label="Actualizar usuario" type="submit" disabled={loading} />
      </Form>
      {errorMessage && (
        <p className={styles.error_message} role="alert">
          {errorMessage}
        </p>
      )}
    </>
  );
}
