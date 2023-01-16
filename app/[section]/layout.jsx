export default function SectionLayout({ children, params }) {
  const { section } = params;
  return (
    <div>
      <h1>{section}</h1>
      {children}
    </div>
  );
}
