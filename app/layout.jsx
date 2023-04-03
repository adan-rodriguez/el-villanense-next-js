import { LoginProvider } from "@/app/context/login";
import { Poppins } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

const poppins = Poppins({ weight: ["400", "700", "900"], subsets: ["latin"] });

export const metadata = {
  title: {
    default: "El Villanense - Portal de noticias",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.className}>
      <body>
        <Header />
        <main>
          <LoginProvider>{children}</LoginProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
