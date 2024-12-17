"use client";

import { useUpdateUser } from "@/app/hooks/useUpdateUser";
import { updateUser } from "@/app/lib/server-actions";
import Form from "@/app/ui/components/Form";
import Input from "@/app/ui/components/Input";
import Label from "@/app/ui/components/Label";
import { SubmitButton } from "@/app/ui/components/SubmitButton";
import styles from "@/app/ui/styles/UpdateUserForm.module.css";

export function UpdateUserForm({ uid, name, email, phone_number, picture }) {
  const { updateUserErrorMessage, getUpdateUserErrorMessage, router } =
    useUpdateUser();

  async function handleSubmit(e) {
    e.preventDefault();
    getUpdateUserErrorMessage("");
    const formData = new FormData(e.target);
    const { errorMessage } = await updateUser({ uid, formData });
    console.log({ errorMessage });
    if (!errorMessage) {
      alert("Usuario actualizado con exito");
      router.push("/login");
      return;
    }
    getUpdateUserErrorMessage(errorMessage);
  }

  return (
    <>
      <Form style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
        <Label label="Nombre completo">
          <Input type="text" id="name" name="name" defaultValue={name} />
        </Label>
        <Label label="Email">
          <Input type="email" id="email" name="email" defaultValue={email} />
        </Label>
        <Label label="Contraseña">
          Mínimo: 6 caracteres
          <Input type="password" id="password" name="password" minLength="6" />
        </Label>
        <Label label="Teléfono">
          <Input
            type="tel"
            id="phone"
            name="phone"
            minLength="6"
            placeholder="+543482524950"
            defaultValue={phone_number}
          />
        </Label>
        {/* formato E.164: 
        Incluye el símbolo +. 
        Añade el código de país (Argentina:
        54). 
        Asegúrate de que el resto del número no tenga prefijos adicionales
        ni caracteres. */}
        <Label label="Link de una foto">
          <Input type="url" id="photo" name="photo" defaultValue={picture} />
        </Label>
        <SubmitButton label="Actualizar usuario" />
      </Form>
      {updateUserErrorMessage && (
        <p className={styles.error_message} role="alert">
          {updateUserErrorMessage}
        </p>
      )}
    </>
  );
}
