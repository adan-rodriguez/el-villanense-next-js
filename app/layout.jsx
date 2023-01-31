// import { Poppins /*, Roboto */ } from "@next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

// const roboto = Roboto({ weight: "400", subsets: ["latin"] });
// const poppins = Poppins({ weight: ["400", "900"], subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="es" /* className={poppins.className}*/>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
