export function FormLayout({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset
      style={{
        padding: "revert",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <legend style={{ padding: "revert" }}>
        <small>{legend}</small>
      </legend>
      {children}
    </fieldset>
  );
}
