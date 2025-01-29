"use client";

import { Role } from "@/app/lib/types";
import { NameForm } from "./NameForm";
import { EmailForm } from "./EmailForm";
import { PasswordForm } from "./PasswordForm";
import { PhoneForm } from "./PhoneForm";
import { RoleForm } from "./RoleForm";
import { ImageForm } from "./ImageForm";

export function UpdateUserForm(userData: {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  role?: Role;
}) {
  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
        padding: "1rem",
        border: "1px solid gray",
        borderRadius: "2px",
        maxWidth: "400px",
      }}
    >
      <ImageForm id={userData.id} initialImage={userData.image} />

      <NameForm id={userData.id} initialName={userData.name} />

      <EmailForm id={userData.id} initialEmail={userData.email} />

      <PasswordForm id={userData.id} />

      <PhoneForm id={userData.id} initialPhone={userData.phone} />

      <RoleForm id={userData.id} initialRole={userData.role} />
    </div>
  );
}
