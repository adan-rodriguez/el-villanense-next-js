"use client";

// Este componente se puede refactorizar para hacerlo de servidor y sólo lo que se necesite sea de cliente

import Link from "next/link";
import styles from "../styles/Header.module.css";
import Logo from "./Logo";
import Image from "next/image";
import SocialMedia from "./SocialMedia";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { label: "Inicio", route: "/" },
  { label: "Locales", route: "/locales" },
  { label: "Regionales", route: "/regionales" },
  { label: "Provinciales", route: "/provinciales" },
  { label: "Nacionales", route: "/nacionales" },
  { label: "Internacionales", route: "/internacionales" },
];

export default function Header() {
  const [isMenuopen, setIsMenuopen] = useState(false);
  const [innerWidth, setInnerWidth] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (isMenuopen) {
      document.querySelector(`.${styles.openmenu_button}`).style.display =
        "none";
      document.querySelector(`.${styles.navbar}`).style.display = "flex";
      document.body.style.overflowY = "hidden";
    } else {
      document.querySelector(`.${styles.openmenu_button}`).style.display = "";
      document.querySelector(`.${styles.navbar}`).style.display = "";
      document.body.style.overflowY = "";
    }

    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsMenuopen(false);
      }
    };

    if (isMenuopen) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, [isMenuopen]);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    addEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <Logo />
        <button
          type="button"
          onClick={() => setIsMenuopen(!isMenuopen)}
          className={styles.openmenu_button}
          aria-label="Abrir menú"
        >
          <Image
            src="/icons/menu/openmenu-icon.svg"
            alt="Abrir menú"
            width={48}
            height={48}
          />
        </button>
        <div className={styles.navbar}>
          <button
            type="button"
            onClick={() => setIsMenuopen(!isMenuopen)}
            className={styles.closemenu_button}
            aria-label="Cerrar menú"
          >
            <Image
              src="/icons/menu/closemenu-icon.svg"
              alt="Cerrar menú"
              width={48}
              height={48}
            />
          </button>
          <nav>
            <ul className={styles.navbar_list}>
              {links.map(({ label, route }) => {
                return (
                  <li className={styles.navbar_list_item} key={label}>
                    <Link
                      className={styles.navbar_link}
                      href={route}
                      {...(innerWidth < 992 && {
                        onClick: () => setIsMenuopen(!isMenuopen),
                      })}
                      style={{
                        fontWeight: pathname === route && "bold",
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <SocialMedia classname="links_social_container_header" />
        </div>
      </div>
    </header>
  );
}
