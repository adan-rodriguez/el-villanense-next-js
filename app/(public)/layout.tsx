import { GoogleAnalytics } from "../ui/components/GoogleAnaliytics";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === "production" && <GoogleAnalytics />}
    </>
  );
}
