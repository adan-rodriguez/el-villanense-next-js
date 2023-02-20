"use client";

// import { Poppins /*, Roboto */ } from "@next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from "./firebase/firebase";

// const roboto = Roboto({ weight: "400", subsets: ["latin"] });
// const poppins = Poppins({ weight: ["400", "900"], subsets: ["latin"] });

export const LoginContext = createContext();

export default function RootLayout({ children }) {
  const [isUserLogged, setIsUserLogged] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }
  });

  return (
    <html lang="es" /* className={poppins.className}*/>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Header />
        <main>
          <LoginContext.Provider value={isUserLogged}>
            {children}
          </LoginContext.Provider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
