// import { isDev } from "../lib/config";
import GoogleAnalytics from "../ui/components/GoogleAnaliytics";

export default function PublicLayout({ children }) {
  return (
    <>
      {children}
      {/* {!isDev && <GoogleAnalytics />} */}
      {!process.env.NODE_ENV === "development" && <GoogleAnalytics />}
    </>
  );
}
