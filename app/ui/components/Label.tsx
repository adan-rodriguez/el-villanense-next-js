import { Asterisk } from "./Asterisk";

export function Label({
  label,
  required,
  children,
}: {
  label: string;
  required: boolean;
  children: React.ReactNode;
}) {
  return (
    <label>
      {label}
      {required && <Asterisk />}
      {children}
    </label>
  );
}
