import { LoginProvider } from "@/app/context/login";
import { Poppins } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import Script from "next/script";

const poppins = Poppins({ weight: ["400", "700", "900"], subsets: ["latin"] });

export const metadata = {
  title: "El Villanense - Portal de noticias",
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#131313",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.className}>
      <body>
        <Header />
        <main>
          <LoginProvider>
            {/* <RevalidateButton>
              <Image
                src="/icons/dashboard/refresh.svg"
                alt="Actualizar"
                width={30}
                height={30}
              />
            </RevalidateButton> */}
            {children}
          </LoginProvider>
        </main>
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
