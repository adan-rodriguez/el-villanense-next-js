export default function Button({ type = "button", label = "Botón", ...props }) {
  return (
    <button type={type} {...props} className="btn">
      {label}
    </button>
  );
}
