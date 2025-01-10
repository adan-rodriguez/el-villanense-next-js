import { AuthProvider } from "@/app/context/auth";
import Footer from "./ui/components/Footer";
import { Header } from "./ui/components/Header";
import "./ui/globals.css";
import { poppins } from "./ui/fonts";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "El Villanense - Portal de noticias",
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#131313",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
