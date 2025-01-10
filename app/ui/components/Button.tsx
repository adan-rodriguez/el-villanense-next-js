// type ButtonProps = {
//   type?: "button" | "submit" | "reset";
//   label?: string;
//   [key: string]: any;
// };

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  type: "button" | "submit" | "reset";
}

export function Button({ label, type, children, ...props }: ButtonProps) {
  return (
    <button type={type} {...props} className="btn">
      {label ?? children}
    </button>
  );
}
