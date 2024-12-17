"use client";

import { useFormStatus } from "react-dom";
import Button from "./Button";

export function SubmitButton({ label = "Enviar" } = {}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      label={label}
      disabled={pending}
      style={{ alignSelf: "center" }}
    />
  );
}
