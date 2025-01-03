import { ReactNode } from "react";
import { Asterisk } from "./Asterisk";

interface LabelProps {
  label: string;
  required?: boolean;
  children: ReactNode;
}

export function Label({ label, required = true, children }: LabelProps) {
  return (
    <label>
      {label}
      {required && <Asterisk />}
      {children}
    </label>
  );
}
