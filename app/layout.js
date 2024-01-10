import { AuthProvider } from "@/app/context/auth";
import Footer from "./ui/components/Footer";
import Header from "./ui/components/Header";
import "./ui/globals.css";
import { poppins } from "./ui/fonts";
import SocialMedia from "./ui/components/SocialMedia";

export const metadata = {
  title: "El Villanense - Portal de noticias",
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#131313",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <AuthProvider>
          <Header />
          <main>
            {/* <RevalidateButton>
              <Image
                src="/icons/dashboard/refresh.svg"
                alt="Actualizar"
                width={30}
                height={30}
              />
            </RevalidateButton> */}
            {children}
          </main>
        </AuthProvider>
        <aside>
          <SocialMedia classname="layout_links_social_container" />
        </aside>
        <Footer />
      </body>
    </html>
  );
}
