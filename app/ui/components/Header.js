"use client";

import styles from "../styles/Header.module.css";
import Logo from "./Logo";
import Image from "next/image";
import useMenu from "@/app/hooks/useMenu";
import MenuPhone from "./MenuPhone";
// import dynamic from "next/dynamic";
// const MenuPhone = dynamic(() => import("./MenuPhone"));

// const links = [
//   { label: "Inicio", route: "/" },
//   { label: "Locales", route: "/locales" },
//   { label: "Regionales", route: "/regionales" },
//   { label: "Provinciales", route: "/provinciales" },
//   { label: "Nacionales", route: "/nacionales" },
//   { label: "Internacionales", route: "/internacionales" },
// ];

export default function Header() {
  const { isMenuOpen, getIsMenuOpen } = useMenu();

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <Logo />
        {!isMenuOpen && (
          <button
            type="button"
            onClick={() => getIsMenuOpen(!isMenuOpen)}
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
        )}
        {isMenuOpen && (
          <MenuPhone isMenuOpen={isMenuOpen} getIsMenuOpen={getIsMenuOpen} />
        )}
      </div>
    </header>
  );
}

{
  /* <nav>
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
</nav> */
}
