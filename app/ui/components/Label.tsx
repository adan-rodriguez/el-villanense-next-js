import { Asterisk } from "./Asterisk";

interface LabelProps {
  label: string;
  required: boolean;
  children: Readonly<React.ReactNode>;
}

export function Label({ label, required, children }: LabelProps) {
  return (
    <label>
      {label}
      {required && <Asterisk />}
      {children}
    </label>
  );
}
