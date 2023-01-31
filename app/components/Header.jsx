"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import Logo from "./Logo";
import Image from "next/image";
import SocialMedia from "./SocialMedia";
import { useEffect, useState } from "react";

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
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

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
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuopen]);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
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
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <SocialMedia />
        </div>
      </div>
    </header>
  );
}
