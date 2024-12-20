import GoogleAnalytics from "../ui/components/GoogleAnaliytics";

export default function PublicLayout({ children }) {
  return (
    <>
      {children}
      {!process.env.NODE_ENV === "development" && <GoogleAnalytics />}
    </>
  );
}
