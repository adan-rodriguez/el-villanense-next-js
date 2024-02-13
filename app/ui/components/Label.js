export default function Label({ label = "Label", children }) {
  return (
    <label>
      {label}
      {children}
    </label>
  );
}
