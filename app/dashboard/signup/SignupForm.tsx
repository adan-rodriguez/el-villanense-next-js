"use client";

import { useSignup } from "@/app/hooks/useSignup";
import styles from "@/app/ui/styles/SignupForm.module.css";
import { Form } from "../../ui/components/Form";
import { Input } from "../../ui/components/Input";
import { Label } from "../../ui/components/Label";
import { Button } from "../../ui/components/Button";
import { InputImage } from "../../ui/components/InputImage";
import { TrashIcon } from "@/app/ui/components/Icons";

export function SignupForm() {
  const {
    name,
    getName,
    email,
    getEmail,
    password,
    getPassword,
    phone,
    getPhone,
    imageFile,
    getImageFile,
    role,
    getRole,
    loading,
    errorMessage,
    register,
  } = useSignup();

  return (
    <>
      <Form
        style={{ maxWidth: "400px" }}
        onSubmit={async (e) => {
          e.preventDefault();
          await register({ name, email, password, imageFile, phone, role });
        }}
      >
        <InputImage imageFile={imageFile} getImageFile={getImageFile} />
        <Label label="Nombre completo" required={true}>
          <Input
            name="name"
            value={name}
            onChange={(e) => getName(e.currentTarget.value)}
            required={true}
            maxLength={150}
            onKeyDown={(e) => {
              if (e.currentTarget.value === "" && e.key === " ") {
                e.preventDefault();
              }
            }}
          />
        </Label>
        <Label label="Email" required={true}>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => getEmail(e.currentTarget.value)}
            required={true}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
              }
            }}
          />
        </Label>
        <Label label="Contraseña" required={true}>
          <small>
            <em>Mínimo: 6 caracteres</em>
          </small>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => getPassword(e.currentTarget.value)}
            required={true}
            autoComplete="new-password"
            minLength={6}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
              }
            }}
          />
        </Label>
        <Label label="Rol" required={true}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <label style={{ border: "1px solid gray", padding: "5px" }}>
              <input
                type="radio"
                name="role"
                value="editor"
                defaultChecked={role === "editor"}
                onChange={() => getRole("editor")}
                style={{ marginRight: "0.25rem", verticalAlign: "middle" }}
                required
              />
              <small>Editor</small>
            </label>
            <label style={{ border: "1px solid gray", padding: "5px" }}>
              <input
                type="radio"
                name="role"
                value="superadmin"
                defaultChecked={role === "superadmin"}
                onChange={() => getRole("superadmin")}
                style={{ marginRight: "0.25rem", verticalAlign: "middle" }}
              />
              <small>Superadministrador</small>
            </label>
          </div>
        </Label>
        {/* formato E.164: 
        Incluye el símbolo +. 
        Añade el código de país (Argentina:
        54). 
        Asegúrate de que el resto del número no tenga prefijos adicionales
        ni caracteres. */}
        {phone !== undefined ? (
          <Label label="Teléfono" required={false}>
            <div style={{ display: "flex" }}>
              <Input
                type="tel"
                name="phone"
                required={true}
                minLength={6}
                placeholder="+543482524950"
                value={phone}
                onChange={(e) => getPhone(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
              />
              <Button
                type="button"
                title="Eliminar número de teléfono"
                onClick={() => getPhone()}
                style={{
                  display: "flex",
                  padding: "0",
                  aspectRatio: "1",
                  alignItems: "center",
                  flexGrow: "1",
                }}
              >
                <TrashIcon />
              </Button>
            </div>
          </Label>
        ) : (
          <Button
            type="button"
            label="Agregar teléfono"
            onClick={() => getPhone("")}
          />
        )}
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
