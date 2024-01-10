import { isDev } from "../lib/config";
import GoogleAnalytics from "../ui/components/GoogleAnaliytics";

export default function PublicLayout({ children }) {
  return (
    <>
      {children}
      {!isDev && <GoogleAnalytics />}
    </>
  );
}
