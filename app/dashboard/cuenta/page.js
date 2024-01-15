"use client";

import { AuthContext } from "@/app/context/auth";
import { auth } from "@/app/lib/config-firebase";
import AuthorImage from "@/app/ui/components/AuthorImage";
import { updateEmail, updatePassword } from "firebase/auth";
import { useContext } from "react";

export default function AccountPage() {
  const { user } = useContext(AuthContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: "40px",
        rowGap: "20px",
      }}
    >
      <AuthorImage src={user.image} author={user.name} />
      <span>{user.name}</span>
      <span>{user.email}</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (confirm("¿Está seguro de cambiar su email?")) {
            updateEmail(auth.currentUser, e.target.email.value)
              .then(() => {
                alert("Email actualizado");
              })
              .catch(() => {
                alert("Ha ocurrido un error. No se pudo actualizar el email");
              });
          }
        }}
      >
        <label>
          Cambiar email
          <input id="email" type="text" placeholder="Nuevo email" required />
        </label>
        <button type="submit">Enviar</button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (confirm("¿Está seguro de cambiar su contraseña?")) {
            updatePassword(auth.currentUser, e.target.email.password)
              .then(() => {
                alert("Contraseña actualizado");
              })
              .catch(() => {
                alert(
                  "Ha ocurrido un error. No se pudo actualizar la contraseña"
                );
              });
          }
        }}
      >
        <label>
          Cambiar contraseña
          <input
            id="password"
            type="password"
            placeholder="Nueva contraseña"
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
