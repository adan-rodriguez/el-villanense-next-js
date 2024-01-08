import { AuthProvider } from "@/app/context/auth";
import Footer from "./ui/components/Footer";
import Header from "./ui/components/Header";
import "./ui/globals.css";
import Script from "next/script";
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
        <Header />
        <main>
          <AuthProvider>
            {/* <RevalidateButton>
              <Image
                src="/icons/dashboard/refresh.svg"
                alt="Actualizar"
                width={30}
                height={30}
              />
            </RevalidateButton> */}
            {children}
          </AuthProvider>
        </main>
        <aside>
          <SocialMedia classname="layout_links_social_container" />
        </aside>
        <Footer />
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-V6RKJKGCX2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-V6RKJKGCX2');
        `}
      </Script>
    </html>
  );
}
