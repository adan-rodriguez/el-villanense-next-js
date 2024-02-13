"use client";

import { AuthContext } from "@/app/context/auth";
import { handleChangeEmail, handleChangePassword } from "@/app/lib/utils";
import AuthorImage from "@/app/ui/components/AuthorImage";
import Button from "@/app/ui/components/Button";
import Form from "@/app/ui/components/Form";
import Input from "@/app/ui/components/Input";
import Label from "@/app/ui/components/Label";
import { useContext } from "react";
import styles from "@/app/ui/styles/AccountPage.module.css";

export default function AccountPage() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <div className={styles.data_container}>
        <p>{user.name}</p>
        <AuthorImage
          src={user.image}
          author={user.name}
          width={60}
          height={60}
        />
        <p>{user.email}</p>
      </div>
      <Form
        style={{ maxWidth: "400px" }}
        onSubmit={(e) => handleChangeEmail({ e })}
      >
        <Label label="Nuevo email">
          <Input id="email" type="email" required={true} />
        </Label>
        <Button
          type="submit"
          label="Cambiar email"
          style={{ alignSelf: "center" }}
        />
      </Form>
      <Form
        style={{ maxWidth: "400px" }}
        onSubmit={(e) => handleChangePassword({ e })}
      >
        <Label label="Nueva contraseña">
          <Input id="password" type="password" required={true} />
        </Label>
        <Button
          type="submit"
          label="Cambiar contraseña"
          style={{ alignSelf: "center" }}
        />
      </Form>
    </div>
  );
}
